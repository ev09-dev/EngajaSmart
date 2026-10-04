interface DeletionStatusPageProps {
  searchParams: Promise<{ id?: string }>;
}

export default async function DeletionStatusPage({
  searchParams,
}: DeletionStatusPageProps) {
  const { id: confirmationCode = '—' } = await searchParams;

  return (
    <main className="min-h-screen flex items-center justify-center p-8 bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow p-8">
        <h1 className="text-2xl font-bold mb-4">
          Estado da exclusão de dados
        </h1>

        <p className="mb-2 text-gray-700">
          Código de confirmação:
        </p>
        <code className="block bg-gray-100 p-2 rounded mb-6 text-sm break-all">
          {confirmationCode}
        </code>

        <p className="text-gray-700">
          O teu pedido foi registado. Todos os dados associados à tua conta
          Instagram foram removidos ou anonimizados.
        </p>
      </div>
    </main>
  );
}