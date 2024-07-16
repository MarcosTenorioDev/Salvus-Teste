export class LanguageKeysPt {
    public application = {
      global: {
        applicationName: "Med +",
        currencyPrefix:"R$"
      },
      pages:{
        homepage:{
          bannerTitle:"Seja bem vindo(a) ao med+",
          bannerDescription:"Sua fonte confiável de produtos médicos de qualidade. Explore nossa ampla gama de produtos projetados para suas necessidades de saúde e bem-estar",
          bannerAction:"Comprar agora",
          searchInputPlaceholder:"Procure o nome do produto que deseja"
        },
        managment:{
          title:"Meus produtos"
        }
      },
      components: {
        navbar:{
            login:"Login", 
            register: "Cadastrar-se",
            myProducts:"Meus produtos",
            logout:"Sair da conta",
            salesPage:"Página de vendas",
            publishProduct:"Publicar produto"
        },
        sidebar:{
          header:{
            title:"Área administrativa"
          }
        }
    },
    };
    //exemplos para alternativas de uso abaixo
    /* public WELCOME_HEADLINE = "Bem vindo ao app";
    
      public MESSAGES = ({ count }: { count: number }) => {
        return count === 1 ? `${count} Mensagem` : `${count} Mensagens`;
      };
    
      public GOOD_MORNING = "Bom dia"; */
  }
  
  export type LangProps = keyof LanguageKeysPt;
  export default LanguageKeysPt;