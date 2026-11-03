// Local QA against a separately started Chrome with --remote-debugging-port=9344.
// Run after npm run build and npm run start -- --port 3100.
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";

const base = "http://127.0.0.1:3100";
const target = await fetch("http://127.0.0.1:9344/json/new?about:blank", { method: "PUT" }).then(r => r.json());
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject; });
let id = 0;
const pending = new Map();
const errors = [];
const loadedDocuments = new Set();
ws.onmessage = event => {
  const message = JSON.parse(event.data);
  if (message.method === "Page.lifecycleEvent" && message.params.name === "load") loadedDocuments.add(message.params.loaderId);
  if (message.method === "Runtime.exceptionThrown") errors.push(message.params.exceptionDetails.text);
  if (!message.id) return;
  const entry = pending.get(message.id);
  if (!entry) return;
  pending.delete(message.id); clearTimeout(entry.timer);
  if (message.error) entry.reject(new Error(JSON.stringify(message.error))); else entry.resolve(message.result);
};
function cdp(method, params = {}) {
  return new Promise((resolve, reject) => {
    const key = ++id;
    const timer = setTimeout(() => { pending.delete(key); reject(new Error(`Timeout: ${method}`)); }, 15000);
    pending.set(key, { resolve, reject, timer }); ws.send(JSON.stringify({ id: key, method, params }));
  });
}
async function evaluate(expression) {
  const result = await cdp("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
  if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails));
  return result.result.value;
}
async function waitFor(expression) {
  for (let i = 0; i < 60; i++) {
    if (await evaluate(expression)) return;
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  throw new Error(`Condition failed: ${expression}`);
}
async function navigate(path) {
  await cdp("Page.setLifecycleEventsEnabled", { enabled: true });
  const { loaderId } = await cdp("Page.navigate", { url: `${base}${path}` });
  for (let i = 0; i < 150 && !loadedDocuments.has(loaderId); i++) await new Promise(resolve => setTimeout(resolve, 100));
  assert.equal(loadedDocuments.has(loaderId), true, `Page did not finish loading: ${path}`);
  await waitFor(`location.pathname === ${JSON.stringify(path)} && document.readyState === 'complete' && !!document.querySelector('h1')`);
  await evaluate("document.fonts.ready.then(() => true)");
  await waitFor("[...document.images].filter(i => i.loading !== 'lazy').every(i => i.complete)");
}
await cdp("Page.enable"); await cdp("Runtime.enable");
await mkdir(".next/qa", { recursive: true });
try {
  for (const [label, width, height] of [["desktop", 1440, 1000], ["tablet", 820, 1180], ["mobile", 390, 844], ["narrow", 320, 740]]) {
    await cdp("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: width < 600 });
    await navigate("/");
    await cdp("Page.bringToFront");
    await cdp("Input.dispatchMouseEvent", { type: "mouseMoved", x: 100, y: 250 });
    await cdp("Input.dispatchMouseEvent", { type: "mouseWheel", x: 100, y: 250, deltaX: 0, deltaY: 600 });
    await waitFor("document.scrollingElement.scrollTop > 100");
    await evaluate("window.scrollTo({top:0,behavior:'instant'})");
    const fullWidth = await evaluate("({left:document.body.getBoundingClientRect().left,right:document.body.getBoundingClientRect().right,width:document.documentElement.clientWidth})");
    assert.equal(fullWidth.left, 0, "Page must use the full viewport width");
    assert.equal(Math.round(fullWidth.right), fullWidth.width);
    const checks = await evaluate(`({ overflow: document.documentElement.scrollWidth > innerWidth, title: document.querySelector('h1').textContent, lang: document.documentElement.lang, projects: document.querySelectorAll('.project-card').length, badLinks: [...document.querySelectorAll('a')].filter(a => a.getAttribute('href') === '#').length, fonts: getComputedStyle(document.querySelector('h1')).fontFamily })`);
    assert.equal(checks.overflow, false, `${label}: horizontal overflow`);
    assert.equal(checks.projects, 4); assert.equal(checks.lang, "pt-BR"); assert.equal(checks.badLinks, 0);
    assert.equal(await evaluate("document.querySelectorAll('#inicio a[download]').length"), 0);
    assert.equal(await evaluate("document.querySelectorAll('#sobre a[download]').length"), 1);
    assert.equal(await evaluate("document.querySelectorAll('.site-footer p').length"), 0);
    assert.equal(await evaluate("document.querySelector('.site-footer').getBoundingClientRect().height < 145"), true, "Footer should stay compact");
    assert.equal(await evaluate("document.body.innerText.includes('lexajosielly@gmail.com') || /previsão de formatura|7º período/i.test(document.body.innerText)"), false, "Personal details should not dominate the public page");
    const composition = await evaluate(`(() => {
      const title = document.querySelector('.cover h1').getBoundingClientRect();
      const index = document.querySelector('.spotlight').getBoundingClientRect();
      const aboutTitle = document.querySelector('#sobre-heading').getBoundingClientRect();
      const aboutCopy = document.querySelector('.about-copy').getBoundingClientRect();
      return { titleClear: index.width === 0 || title.right <= index.left || title.bottom <= index.top, aboutClear: aboutTitle.bottom <= aboutCopy.top, heroImages: document.querySelectorAll('#inicio img').length };
    })()`);
    assert.equal(composition.titleClear, true, `${label}: hero title overlaps project index`);
    assert.equal(composition.heroImages, 0, "Avatar should be reserved for Ask ILexie");
    await evaluate("document.querySelector('#spotlight-tab-1').click(); document.querySelector('#spotlight-tab-1').focus()");
    await waitFor("document.querySelector('.spotlight-panel h2')?.textContent === 'SOC Open Source'");
    assert.equal(await evaluate("document.querySelector('#spotlight-tab-1').getAttribute('aria-selected')"), "true");
    await cdp("Input.dispatchKeyEvent", { type: "keyDown", key: "ArrowRight", code: "ArrowRight", windowsVirtualKeyCode: 39 });
    await cdp("Input.dispatchKeyEvent", { type: "keyUp", key: "ArrowRight", code: "ArrowRight", windowsVirtualKeyCode: 39 });
    await waitFor("document.querySelector('.spotlight-panel h2')?.textContent === 'Gradus Flow'");
    await evaluate("document.querySelector('#spotlight-tab-0').click()");
    await waitFor("document.querySelector('.spotlight-panel h2')?.textContent === 'Esteira DevSecOps Open Source'");
    await waitFor("Number(getComputedStyle(document.querySelector('.spotlight-panel > div')).opacity) >= .99");
    await evaluate("document.activeElement instanceof HTMLElement && document.activeElement.blur()");
    assert.equal(composition.aboutClear, true, `${label}: about heading overlaps body`);
    await evaluate("document.querySelector('.research-item summary').click()");
    assert.equal(await evaluate("document.querySelector('.research-item').open"), true);
    await evaluate("document.querySelector('.research-item summary').click()");
    if (width < 850) {
      await evaluate("document.querySelector('.menu-toggle').click()");
      assert.equal(await evaluate("document.querySelector('.menu-toggle').getAttribute('aria-expanded')"), "true");
      await evaluate("document.querySelector('#main-nav a').click()");
      assert.equal(await evaluate("document.querySelector('.menu-toggle').getAttribute('aria-expanded')"), "false");
    }
    await evaluate("document.querySelector('.chat-launcher').click()");
    await waitFor("!!document.querySelector('dialog[open] .chat-error')");
    assert.equal(await evaluate("document.querySelector('#ilexie-question').disabled"), true);
    assert.equal(await evaluate("document.querySelectorAll('.chat-suggestions button').length"), 0, "Unavailable chat should show navigation instead of disabled questions");
    assert.equal(await evaluate("document.querySelectorAll('.chat-shortcuts a').length"), 2);
    await evaluate("document.querySelector('dialog .chat-header img').decode().catch(() => {})");
    const chatShot = await cdp("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
    await writeFile(`.next/qa/chat-${label}.png`, Buffer.from(chatShot.data, "base64"));
    await cdp("Input.dispatchKeyEvent", { type: "keyDown", key: "Escape", code: "Escape", windowsVirtualKeyCode: 27 });
    await cdp("Input.dispatchKeyEvent", { type: "keyUp", key: "Escape", code: "Escape", windowsVirtualKeyCode: 27 });
    await waitFor("!document.querySelector('dialog').open");
    await evaluate("window.scrollTo(0,0)");
    const screenshot = await cdp("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
    await writeFile(`.next/qa/${label}.png`, Buffer.from(screenshot.data, "base64"));
    console.log(`${label}: menu, chat, Escape, content and overflow OK`, checks.fonts);
    if (label === "desktop") {
      for (const section of ["sobre", "projetos", "pesquisa", "extensao", "ask-ilexie"]) {
        await evaluate(`document.getElementById('${section}').scrollIntoView({behavior:'instant'})`);
        await evaluate(`Promise.all([...document.getElementById('${section}').querySelectorAll('img')].map(image => image.decode().catch(() => {})))`);
        if (section === "projetos") {
          await cdp("Input.dispatchMouseEvent", { type: "mouseMoved", x: 5, y: 5 });
          await new Promise(resolve => setTimeout(resolve, 750));
          const background = await evaluate("getComputedStyle(document.querySelector('.project-card')).backgroundColor");
          const point = await evaluate("(() => {const r=document.querySelector('.project-card').getBoundingClientRect();return {x:r.left+25,y:r.top+25};})()");
          await cdp("Input.dispatchMouseEvent", { type: "mouseMoved", ...point });
          await waitFor(`getComputedStyle(document.querySelector('.project-card')).backgroundColor !== ${JSON.stringify(background)}`);
          assert.ok(await evaluate("parseFloat(getComputedStyle(document.querySelector('.project-card')).transitionDuration) > 0"));
          await new Promise(resolve => setTimeout(resolve, 750));
          const hoverShot = await cdp("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
          await writeFile(".next/qa/project-hover.png", Buffer.from(hoverShot.data, "base64"));
          await cdp("Input.dispatchMouseEvent", { type: "mouseMoved", x: 5, y: 5 });
          await new Promise(resolve => setTimeout(resolve, 750));
        }
        const shot = await cdp("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
        await writeFile(`.next/qa/${label}-${section}.png`, Buffer.from(shot.data, "base64"));
      }
      await navigate("/projetos/ask-ilexie");
      const caseShot = await cdp("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
      await writeFile(".next/qa/case-study-desktop.png", Buffer.from(caseShot.data, "base64"));
    }
  }
  for (const slug of ["esteira-devsecops", "soc-open-source", "gradus-flow", "ask-ilexie"]) {
    await navigate(`/projetos/${slug}`);
    assert.equal(await evaluate("document.documentElement.scrollWidth > innerWidth"), false, slug);
    assert.ok(await evaluate("document.querySelector('article h2')?.textContent"));
    assert.equal(await evaluate("document.querySelectorAll('.case-detail').length >= 3"), true);
    assert.equal(await evaluate("document.querySelectorAll('.case-detail[open]').length"), 0);
    const topline = await evaluate(`(() => {
      const back = document.querySelector('.back-link').getBoundingClientRect();
      const meta = document.querySelector('.case-topline > .eyebrow').getBoundingClientRect();
      return { separate: back.right + 16 <= meta.left || back.bottom + 16 <= meta.top };
    })()`);
    assert.equal(topline.separate, true, `${slug}: back link and metadata need clear separation`);
    await evaluate("document.querySelectorAll('.case-detail summary')[1].click()");
    assert.equal(await evaluate("document.querySelectorAll('.case-detail')[1].open"), true);
    assert.ok(await evaluate("document.querySelector('.architecture').innerText.length > 20"));
    await evaluate("document.querySelectorAll('.case-detail summary')[1].click()");
    await evaluate("document.querySelector('.case-technologies summary').click()");
    assert.equal(await evaluate("!!document.querySelector('.case-technologies[open] .tags li')"), true);
    await evaluate("document.querySelector('.case-technologies summary').click()");
    if (slug === "ask-ilexie") {
      const studyShot = await cdp("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
      await writeFile(".next/qa/case-study-mobile.png", Buffer.from(studyShot.data, "base64"));
      await evaluate("document.querySelectorAll('.case-detail').forEach(detail => { detail.open = true; })");
      assert.equal(await evaluate("document.querySelectorAll('.case-detail[open]').length"), 9);
      assert.equal(await evaluate("document.documentElement.scrollWidth > innerWidth"), false, "Expanded study must not overflow");
      assert.equal(await evaluate("document.querySelector('.case-article').innerText.includes('Segurança, privacidade e custos')"), true);
      await evaluate("document.querySelectorAll('.case-detail').forEach(detail => { detail.open = false; })");
    }
    console.log(`project ${slug}: OK`);
  }
  const missing = await fetch(`${base}/projetos/does-not-exist`);
  assert.equal(missing.status, 404);
  const pdf = await fetch(`${base}/resume.pdf`); assert.equal(pdf.status, 200);
  assert.match(pdf.headers.get("content-type"), /pdf/);
  const api = await fetch(`${base}/api/ask`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: [{ role: "user", content: "Olá" }] }) });
  assert.equal(api.status, 503);
  assert.deepEqual(errors, []);
  console.log("404, PDF, unavailable API and browser runtime: OK");
  // Browser-only fixtures test UI states without contacting or simulating a live
  // provider in the actual app. They disappear when this isolated tab closes.
  await cdp("Page.addScriptToEvaluateOnNewDocument", { source: `
    const originalFetch = window.fetch.bind(window);
    window.fetch = async (url, options) => {
      if (String(url) !== '/api/ask') return originalFetch(url, options);
      if (options?.method !== 'POST') return Response.json({available:true});
      await new Promise(resolve => setTimeout(resolve, 350));
      const body = JSON.parse(options.body);
      if (body.messages.at(-1).content.includes('falhar')) return Response.json({error:'Limite de teste. Aguarde um minuto.'},{status:429});
      return Response.json({answer:'Resposta de teste: <script>window.unsafe=true</script>',sources:[{title:'Ask ILexie',href:'/projetos/ask-ilexie'}]});
    };` });
  await navigate("/");
  await evaluate("document.querySelector('.chat-launcher').click()");
  await waitFor("!!document.querySelector('.chat-suggestions button') && !document.querySelector('.chat-suggestions button').disabled");
  await evaluate("document.querySelector('.chat-suggestions button').click()");
  await waitFor("!!document.querySelector('.generating')");
  await waitFor("document.querySelectorAll('.chat-message').length === 3");
  assert.equal(await evaluate("!!document.querySelector('.chat-message a[href=\"/projetos/ask-ilexie\"]')"), true);
  assert.equal(await evaluate("!!window.unsafe || !!document.querySelector('.chat-message script')"), false);
  await evaluate("document.querySelector('#ilexie-question').focus()");
  await cdp("Input.insertText", { text: "falhar" });
  await evaluate("document.querySelector('.chat-input-row button').click()");
  await waitFor("!!document.querySelector('.chat-error')");
  assert.equal(await evaluate("document.querySelector('#ilexie-question').value"), "falhar");
  await evaluate("document.querySelector('.chat-tools button').click()");
  assert.equal(await evaluate("document.querySelectorAll('.chat-message').length"), 1);
  assert.equal(await evaluate("document.querySelector('#ilexie-question').value"), "");
  await cdp("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
  assert.equal(await evaluate("getComputedStyle(document.documentElement).scrollBehavior"), "auto");
  assert.equal(await evaluate("getComputedStyle(document.querySelector('.project-card')).transitionDuration"), "0s");
  assert.deepEqual(errors, []);
  console.log("Browser-only fixtures: send, loading, links, escaped HTML, retry, clear and reduced motion OK");
} finally {
  await cdp("Page.close").catch(() => {}); ws.close();
}
