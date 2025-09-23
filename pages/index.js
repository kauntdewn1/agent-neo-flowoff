import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>NEO.FLOWOFF - Agente IA</title>
        <meta name="description" content="Agente IA da NEO.FLOWOFF" />
        <link rel="icon" href="/maskable-512.webp" />
      </Head>

      <main style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        fontFamily: 'system-ui, sans-serif'
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
          🤖 NEO.FLOWOFF
        </h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
          Agente IA funcionando!
        </p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <a 
            href="/embed" 
            style={{
              padding: '12px 24px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '8px',
              textDecoration: 'none',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.3)'
            }}
          >
            🚀 Acessar Chat
          </a>
          <a 
            href="/api/health" 
            style={{
              padding: '12px 24px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '8px',
              textDecoration: 'none',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.3)'
            }}
          >
            📊 Health Check
          </a>
        </div>
      </main>
    </div>
  )
}
