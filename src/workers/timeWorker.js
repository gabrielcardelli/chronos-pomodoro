self.onmessage = function (e) {
  console.log('Worker received message:', e.data);

  self.postMessage('Olá do worker!');

  switch (e.data) {
    case 'FAVOR': {
      self.postMessage('Posso fazer favor');
      break;
    }
    case 'FALA_OI': {
      self.postMessage('OI!!!');
      break;
    }
    case 'FECHAR': {
      self.postMessage('TA BOM, TCHAU!');
      self.close;
      break;
    }
    default: {
      self.postMessage('Não entendi!');
    }
  }
};
