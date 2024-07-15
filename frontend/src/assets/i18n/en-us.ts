export class LanguageKeysEn {
    public application = {
      global: {
        applicationName: "Salvus"
      }
    };
    //exemplos para alternativas de uso abaixo
    /* public WELCOME_HEADLINE = "Bem vindo ao app";
    
      public MESSAGES = ({ count }: { count: number }) => {
        return count === 1 ? `${count} Mensagem` : `${count} Mensagens`;
      };
    
      public GOOD_MORNING = "Bom dia"; */
  }
  
  export type LangProps = keyof LanguageKeysEn;
  export default LanguageKeysEn;