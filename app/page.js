import Confetti from "./confetti";

// Página estática regenerada em segundo plano (ISR) no máximo a cada 60s,
// em vez de consultar a API do TabNews a cada requisição.
export const revalidate = 60;

async function getTotalContents() {
  try {
    const response = await fetch(
      "https://www.tabnews.com.br/api/v1/contents?per_page=1&strategy=new",
      {
        next: { revalidate: 60 },
        // Evita que uma API lenta segure a geração da página.
        signal: AbortSignal.timeout(3000),
      },
    );

    if (!response.ok) return null;

    const total = Number(response.headers.get("x-pagination-total-rows"));
    return Number.isFinite(total) ? total : null;
  } catch {
    return null;
  }
}

export default async function Home() {
  const totalContents = await getTotalContents();

  return (
    <main>
      <Confetti />
      <h1>Em construção</h1>
      <p className="description">
        Estamos neste exato momento reconstruindo o TabNews, um lugar na
        internet para quem trabalha com tecnologia e precisa consumir conteúdo
        com valor concreto.
      </p>
      <p className="total">
        {totalContents !== null ? (
          <>
            <strong>{totalContents.toLocaleString("pt-BR")}</strong> conteúdos
            publicados no TabNews
          </>
        ) : (
          "Não foi possível carregar o total de conteúdos publicados no TabNews."
        )}
      </p>
      <a href="https://www.tabnews.com.br">Acesse o TabNews oficial</a>
    </main>
  );
}
