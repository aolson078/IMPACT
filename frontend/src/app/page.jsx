export default function Home() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ textAlign: 'center', maxWidth: '800px', padding: '2rem' }}>
        <h1 style={{ 
          fontSize: '4rem', 
          fontWeight: 'bold', 
          marginBottom: '1rem',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
        }}>
          IMPACT
        </h1>
        
        <p style={{ 
          fontSize: '1.5rem', 
          marginBottom: '3rem',
          opacity: 0.9
        }}>
          ReFi platform for ecological verification, staking, and impact tracking
        </p>
        
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          flexWrap: 'wrap', 
          justifyContent: 'center' 
        }}>
          <button style={{
            padding: '1rem 2rem',
            fontSize: '1.2rem',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            transition: 'transform 0.2s'
          }}>
            Verify
          </button>
          
          <button style={{
            padding: '1rem 2rem',
            fontSize: '1.2rem',
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            transition: 'transform 0.2s'
          }}>
            Stake
          </button>
          
          <button style={{
            padding: '1rem 2rem',
            fontSize: '1.2rem',
            backgroundColor: '#FF9800',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            transition: 'transform 0.2s'
          }}>
            Stats
          </button>
        </div>
        
        <div style={{ 
          marginTop: '3rem', 
          padding: '1rem',
          backgroundColor: 'rgba(255,255,255,0.1)',
          borderRadius: '8px',
          backdropFilter: 'blur(10px)'
        }}>
          <p style={{ margin: 0, fontSize: '1rem' }}>
            🚀 Bare bones version ready for Azure deployment
          </p>
        </div>
      </div>
    </div>
  );
}