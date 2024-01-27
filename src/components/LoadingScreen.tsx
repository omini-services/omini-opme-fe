const LoadingScreen = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}
  >
    <div>
      <p>Carregando...</p>
      {/* Você pode adicionar animações ou um spinner aqui */}
    </div>
  </div>
);

export default LoadingScreen;
