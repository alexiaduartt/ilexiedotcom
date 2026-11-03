"use client";
export default function Error({ reset }: { reset: () => void }) { return <main id="conteudo" className="not-found"><h1>Uma pausa inesperada.</h1><p>Não foi possível carregar esta página.</p><button className="button" onClick={reset}>Tentar novamente</button></main>; }
