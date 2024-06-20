declare namespace PagSeguroDirectPayment {
    function setSessionId(sessionId: string): void;
  
    interface CardTokenResponse {
      card: {
        token: string;
      };
    }
  
    interface CardTokenError {
      errors: { [key: string]: string };
    }
  
    function createCardToken(params: {
      cardNumber: string;
      brand: string;
      cvv: string;
      expirationMonth: string;
      expirationYear: string;
      success: (response: CardTokenResponse) => void;
      error: (response: CardTokenError) => void;
    }): void;
  }
  