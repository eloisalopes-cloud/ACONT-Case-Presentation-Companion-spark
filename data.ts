import { ScriptSection, MetricCard, FiveWhysNode, GUTItem } from './types';

export const EXPLANATION_OF_CHANGES = {
  title: "Estratégia de Ajuste de Roteiro",
  concept: "Efeito Surpresa & Clímax de Dados no Fechamento",
  points: [
    {
      title: "Eliminação do Spoiler Operacional",
      desc: "No roteiro original, os números do NPS, renovação, falhas e faturamento eram ditos na metade final e depois repetidos quase que literalmente no fechamento. Ao remover esses números da fala da Eloisa no FINAL, geramos curiosidade e limpamos a narrativa humana."
    },
    {
      title: "Foco no Impacto Humano & Qualitativo",
      desc: "No FINAL, Eloisa agora foca no valor real gerado: a suspensão de encargos estaduais abusivos para clientes universitários e a expansão nacional, sem antecipar as taxas exatas. Isso engrandece a transição da Regina: 'Mas o resultado que mais define esse case não está em nenhum desses números'."
    },
    {
      title: "Impacto Explosivo no Fechamento",
      desc: "No FECHAMENTO, quando Regina recita os números de forma rítmica, rápida e avassaladora, o público ouve esses dados pela primeira vez todos juntos. Isso cria um impacto retórico e performático muito maior."
    }
  ]
};

export const METRICS_DATA: MetricCard[] = [
  {
    id: "reducao_tempo",
    value: "98,4%",
    label: "Redução no Tempo de Processos",
    suffix: "",
    description: "Tarefas que levavam de 3 a 4 dias reduzidas para menos de 1 hora.",
    category: "efficiency"
  },
  {
    id: "economia_licencas",
    value: "24.000",
    label: "Economia Anual em Licenças",
    prefix: "R$ ",
    suffix: " /ano",
    description: "Eliminação de softwares redundantes e reinversão direta na própria EJ.",
    category: "financial"
  },
  {
    id: "nps",
    value: "4,9+",
    label: "NPS Médio dos Clientes",
    suffix: " / 5.0",
    description: "Avaliação histórica de satisfação e qualidade contábil.",
    category: "client"
  },
  {
    id: "renovacao",
    value: "87%",
    label: "Taxa de Renovação de Projetos",
    suffix: "",
    description: "Fidelidade e recorrência operacional com grandes marcas parceiras.",
    category: "client"
  },
  {
    id: "falhas",
    value: "92,6%",
    label: "Redução de Falhas Operacionais",
    suffix: "",
    description: "Comprovado após a centralização contábil em plataforma única.",
    category: "efficiency"
  },
  {
    id: "reversao_encargos",
    value: "97%",
    label: "Reversão de Encargos Estaduais",
    suffix: "",
    description: "Cobranças indevidas de impostos estaduais suspensas para clientes em áreas de campus.",
    category: "financial"
  },
  {
    id: "projetos_estados",
    value: "250",
    label: "Projetos Conduzidos",
    suffix: " em 18 Estados",
    description: "A força nacional da contabilidade júnior do Nordeste.",
    category: "scale"
  },
  {
    id: "faturamento",
    value: "500k",
    label: "Faturamento em 6 Meses",
    prefix: "R$ ",
    suffix: "",
    description: "Marco financeiro histórico nunca antes presenciado em 22 anos.",
    category: "scale"
  }
];

export const FIVE_WHYS_DATA: FiveWhysNode[] = [
  {
    step: 1,
    question: "Por que tivemos a maior crise operacional em 22 anos?",
    answer: "Porque o time estava sobrecarregado com retrabalhos e desligamentos frequentes de membros."
  },
  {
    step: 2,
    question: "Por que o time estava sobrecarregado e com alto retrabalho?",
    answer: "Porque tarefas simples do dia a dia, como conciliações e lançamentos, demoravam de 3 a 4 dias para serem concluídas."
  },
  {
    step: 3,
    question: "Por que as tarefas demoravam tanto tempo para serem feitas?",
    answer: "Porque os processos operacionais eram executados de forma extremamente fragmentada e descentralizada."
  },
  {
    step: 4,
    question: "Por que os processos eram tão fragmentados?",
    answer: "Porque utilizávamos diversas planilhas avulsas, ferramentas sobrepostas e plataformas desconectadas."
  },
  {
    step: 5,
    question: "Por que utilizávamos tantas ferramentas e planilhas avulsas?",
    answer: "Porque havia uma grave fragmentação tecnológica na infraestrutura operacional da EJ. Esse foi o diagnóstico raiz confirmado pela Matriz GUT!"
  }
];

export const GUT_MATRIX_DATA: GUTItem[] = [
  {
    criterion: "Gravidade (G)",
    score: 5,
    description: "Extrema gravidade: 7 desligamentos por estresse e passivo contábil acumulado de 25 mil lançamentos."
  },
  {
    criterion: "Urgência (U)",
    score: 5,
    description: "Imediata: Sobrecarga ameaçava a entrega dos livros diários e a saúde mental da equipe no curto prazo."
  },
  {
    criterion: "Tendência (T)",
    score: 5,
    description: "Piorar rapidamente: O crescimento das vendas aumentaria exponencialmente a fragmentação e o colapso."
  }
];

export const SCRIPT_SECTIONS: ScriptSection[] = [
  {
    id: "video",
    title: "1. VÍDEO (Introdução)",
    duration: "1:30",
    targetSeconds: 90,
    subtitle: "A quebra da narrativa e a afirmação do Nordeste inovador",
    visualHighlights: [
      "Narrativa que o Nordeste inova",
      "Quebra de paradigmas",
      "Lançamento do tom do pitch"
    ],
    originalLines: [
      {
        speaker: "SISTEMA",
        text: "[Vídeo Institucional / Slide de Abertura] Uma trilha sonora inspiradora e minimalista começa. Imagens rápidas do Nordeste, da sede da ACONT e do time em ação.",
        notes: "Mantenha postura firme e queixo erguido. Conexão direta com a banca avaliadora."
      }
    ],
    modifiedLines: [
      {
        speaker: "SISTEMA",
        text: "[Vídeo Institucional / Slide de Abertura] Uma trilha sonora inspiradora e minimalista começa. Imagens rápidas do Nordeste, da sede da ACONT e do time em ação.",
        notes: "Mantenha postura firme e queixo erguido. Conexão direta com a banca avaliadora."
      }
    ]
  },
  {
    id: "inicio",
    title: "2. INÍCIO",
    duration: "2:00",
    targetSeconds: 120,
    subtitle: "O contraste entre o crescimento de 2025 e a crise de sobrecarga",
    visualHighlights: [
      "2025: Metas batidas e resultados históricos",
      "Crescimento vs Estrutura Operacional",
      "7 desligamentos por estresse em 22 anos"
    ],
    originalLines: [
      {
        speaker: "Eloisa",
        text: "Existe uma narrativa que o Brasil precisa revisar: a de que inovação nasce apenas nos grandes centros, com grandes equipes e grandes investimentos. Que tecnologia de verdade só vem do sudeste, de uma big tech do exterior, de quem já chegou lá."
      },
      {
        speaker: "Eloisa",
        text: "O nosso case existe para contradizer essa narrativa. Não com discurso. Com dados. E com uma história que começa dentro de uma empresa júnior aqui do Nordeste."
      },
      {
        speaker: "Regina",
        text: "Em 2025, vivemos um ano extraordinário, marcado por crescimento, metas superadas e resultados históricos nunca visto. Mas, internamente, essa expansão escondia um dilema perigoso: a busca por bater metas de faturamento a qualquer custo, enquanto a área de projetos não possuía a estrutura necessária para sustentar esse avanço."
      },
      {
        speaker: "Regina",
        text: "Com processos fragmentados entre diferentes plataformas, planilhas e ferramentas sobrepostas, atividades que deveriam levar horas demoravam dias, gerando retrabalho, desgaste e ineficiência. No fim, o problema nunca foi falta de dedicação, foi a ausência de uma estrutura operacional capaz de acompanhar o crescimento da empresa."
      },
      {
        speaker: "Eloisa",
        text: "O resultado: a maior crise em 22 anos de história. Sete desligamentos por sobrecarga de demandas. Áreas desconectadas. E uma pergunta que a gestão precisava responder: o que somos capazes de construir para melhor a operacionalidade do nosso time?"
      }
    ],
    modifiedLines: [
      {
        speaker: "Eloisa",
        text: "Existe uma narrativa que o Brasil precisa revisar: a de que inovação nasce apenas nos grandes centros, com grandes equipes e grandes investimentos. Que tecnologia de verdade só vem do sudeste, de uma big tech do exterior, de quem já chegou lá."
      },
      {
        speaker: "Eloisa",
        text: "O nosso case existe para contradizer essa narrativa. Não com discurso. Com dados. E com uma história que começa dentro de uma empresa júnior aqui do Nordeste."
      },
      {
        speaker: "Regina",
        text: "Em 2025, vivemos um ano extraordinário, marcado por crescimento, metas superadas e resultados históricos nunca visto. Mas, internamente, essa expansão escondia um dilema perigoso: a busca por bater metas de faturamento a qualquer custo, enquanto a área de projetos não possuía a estrutura necessária para sustentar esse avanço."
      },
      {
        speaker: "Regina",
        text: "Com processos fragmentados entre diferentes plataformas, planilhas e ferramentas sobrepostas, atividades que deveriam levar horas demoravam dias, gerando retrabalho, desgaste e ineficiência. No fim, o problema nunca foi falta de dedicação, foi a ausência de uma estrutura operacional capaz de acompanhar o crescimento da empresa."
      },
      {
        speaker: "Eloisa",
        text: "O resultado: a maior crise em 22 anos de história. Sete desligamentos por sobrecarga de demandas. Áreas desconectadas. E uma pergunta que a gestão precisava responder: o que somos capazes de construir para melhor a operacionalidade do nosso time?"
      }
    ]
  },
  {
    id: "meio",
    title: "3. MEIO",
    duration: "2:30",
    targetSeconds: 150,
    subtitle: "O diagnóstico com 5 Porquês, GUT, e a resposta genial de Samuel e Eloisa",
    visualHighlights: [
      "Metodologia dos 5 Porquês & Matriz GUT",
      "Samuel: Plataforma unificada (3 dias para < 1 hora)",
      "Eloisa: Onboarding gamificado (menos de 2 meses de EJ)",
      "Redistribuição de talentos (Presidência, VP, Comarketing)"
    ],
    originalLines: [
      {
        speaker: "Regina",
        text: "Antes de qualquer ação, a primeira decisão foi diagnosticar a problemática: Em imersão com todos os setores, a metodologia dos 5 Porquês apontou para a fragmentação tecnológica como o problema de maior gravidade, urgência e tendência de agravamento confirmado pela Matriz GUT."
      },
      {
        speaker: "Regina",
        text: "Com o diagnóstico claro, os objetivos também ficaram: unificar a operação, reduzir o tempo dos processos e permitir que o time explorasse outras áreas da empresa."
      },
      {
        speaker: "Eloisa",
        text: "E a resposta não veio de cima, mas da base. Veio de Samuel, um dos nossos membros, que enxergou naquele problema uma oportunidade concreta. De forma interativa, ao longo de até três meses, desenvolveu uma plataforma de gestão operacional com base no uso e feedback real dos times, unificando automação de processos, controle de atividades por cliente e gestão integrada em um único lugar."
      },
      {
        speaker: "Eloisa",
        text: "Uma demanda que levava de três a quatro dias para ser finalizada, passou a ser concluída em menos de uma hora. A ACONT saiu de um passivo de quase 25 mil lançamentos contábeis para 100 livros diários entregues em menos de 30 dias. Algo nunca presenciado em 22 anos de empresa."
      },
      {
        speaker: "Regina",
        text: "Mas também tivemos outra resposta. De Eloisa, que está ao meu lado, membro do prosel 2026.1 que, com menos de 2 meses de EJ, também desenvolveu um sistema personalizado de onboarding com trilhas gamificadas, possibilitando que o aprendizado progressivo e engajamento operacional dos membros fosse garantido desde o primeiro dia."
      },
      {
        speaker: "Regina",
        text: "Onda verde, os resultados apareceram rapidamente: mais de R$ 24.000 anuais de licenças foram eliminados da operação e reinvestidos na própria entidade. 98,4% de redução no tempo dos processos, fazendo com que a ACONT redistribuisse os seus talentos : 4 novos assessores na Presidência, 5 na Vice-Presidência e 9 no Comarketing . Membros que antes estavam presos em tarefas repetitivas passaram a viver outras frentes da empresa."
      }
    ],
    modifiedLines: [
      {
        speaker: "Regina",
        text: "Antes de qualquer ação, a primeira decisão foi diagnosticar a problemática: Em imersão com todos os setores, a metodologia dos 5 Porquês apontou para a fragmentação tecnológica como o problema de maior gravidade, urgência e tendência de agravamento confirmado pela Matriz GUT."
      },
      {
        speaker: "Regina",
        text: "Com o diagnóstico claro, os objetivos também ficaram: unificar a operação, reduzir o tempo dos processos e permitir que o time explorasse outras áreas da empresa."
      },
      {
        speaker: "Eloisa",
        text: "E a resposta não veio de cima, mas da base. Veio de Samuel, um dos nossos membros, que enxergou naquele problema uma oportunidade concreta. De forma interativa, ao longo de até três meses, desenvolveu uma plataforma de gestão operacional com base no uso e feedback real dos times, unificando automação de processos, controle de atividades por cliente e gestão integrada em um único lugar."
      },
      {
        speaker: "Eloisa",
        text: "Uma demanda que levava de três a quatro dias para ser finalizada, passou a ser concluída em menos de uma hora. A ACONT saiu de um passivo de quase 25 mil lançamentos contábeis para 100 livros diários entregues em menos de 30 dias. Algo nunca presenciado em 22 anos de empresa."
      },
      {
        speaker: "Regina",
        text: "Mas também tivemos outra resposta. De Eloisa, que está ao meu lado, membro do prosel 2026.1 que, com menos de 2 meses de EJ, também desenvolveu um sistema personalizado de onboarding com trilhas gamificadas, possibilitando que o aprendizado progressivo e engajamento operacional dos membros fosse garantido desde o primeiro dia."
      },
      {
        speaker: "Regina",
        text: "Onda verde, os resultados apareceram rapidamente: mais de R$ 24.000 anuais de licenças foram eliminados da operação e reinvestidos na própria entidade. 98,4% de redução no tempo dos processos, fazendo com que a ACONT redistribuisse os seus talentos : 4 novos assessores na Presidência, 5 na Vice-Presidência e 9 no Comarketing . Membros que antes estavam presos em tarefas repetitivas passaram a viver outras frentes da empresa."
      }
    ]
  },
  {
    id: "final",
    title: "4. FINAL",
    duration: "2:30",
    targetSeconds: 150,
    subtitle: "A jornada pedagógica que formou a Innovuz e levou ao Destine 26",
    visualHighlights: [
      "Jornada pedagógica completa",
      "Samuel funda a startup Innovuz",
      "Membros no Destine 26",
      "Sinergia e desenvolvimento contínuo"
    ],
    originalLines: [
      {
        speaker: "Eloisa",
        text: "Com a operação unificada, os efeitos chegaram diretamente aos clientes: NPS de 4,9+, 87% de renovação e 92,6% de redução nas falhas operacionais. A otimização técnica ampliada também permitiu reverter 97% dos encargos cobrados indevidamente pelo Estado sobre clientes em espaços universitários, devolvendo recursos reais a quem nos contrata.",
        highlighted: true,
        notes: "SPOILER: Esses números serão repetidos no fechamento. Gera redundância!"
      },
      {
        speaker: "Eloisa",
        text: "No agora, as plataformas foram a chave para mais de 200 clientes impactados, 250 projetos conduzidos em 18 estados e R$ 500 mil faturados em seis meses do ano.",
        highlighted: true,
        notes: "SPOILER: Projetos, faturamento e estados repetidos no fechamento."
      },
      {
        speaker: "Regina",
        text: "Mas o resultado que mais define esse case não está em nenhum desses números."
      },
      {
        speaker: "Regina",
        text: "Samuel e Eloisa não apenas entregaram uma solução. Eles percorreram, dentro da ACONT, todas as etapas de um projeto real: identificaram o problema, estruturaram a solução, validaram com as áreas e implantaram em produção. Foi exatamente essa experiência, construída aqui dentro, que levou Samuel a fundar a Innovuz, uma startup em crescimento exponencial no mercado. Os 2 ainda estão conosco e estão presentes no Destine 26 aperfeiçoando suas habilidades, porque entendem que a ACONT e o MEJ ainda tem o que oferecer para quem quer continuar evoluindo."
      },
      {
        speaker: "Eloisa",
        text: "Isso é o que destaca uma EJ que forma de verdade: ela não entrega apenas projetos para os clientes. Ela entrega experiências reais para os membros, experiências que viram competência, competência que torna o mercado nordestino mais competitivo e colaborativo."
      }
    ],
    modifiedLines: [
      {
        speaker: "Eloisa",
        text: "Com a operação unificada, os efeitos chegaram diretamente a quem nos contrata. Mais do que otimização técnica, passamos a entregar um serviço blindado contra erros e de extrema fidelidade operacional. Essa eficiência nos permitiu ir além da rotina: nossa atuação especializada interveio junto ao Estado, revertendo cobranças indevidas de impostos sobre clientes localizados em espaços universitários, devolvendo recursos reais para suas operações.",
        highlighted: true,
        notes: "REESCRITA QUALITATIVA: Descreve o valor (fidelidade, reverter cobrança abusiva) sem antecipar as estatísticas numéricas exatas!"
      },
      {
        speaker: "Eloisa",
        text: "No agora, as ferramentas que desenvolvemos redesenharam nossa presença operacional, sendo a chave de entrada para expandirmos nossa marca e impactarmos clientes em escala de ponta a ponta no país.",
        highlighted: true,
        notes: "REESCRITA QUALITATIVA: Substitui faturamento, estados e contagem de clientes por 'presença operacional em escala nacional' para manter a surpresa."
      },
      {
        speaker: "Regina",
        text: "Mas o resultado que mais define esse case não está em nenhum desses números."
      },
      {
        speaker: "Regina",
        text: "Samuel e Eloisa não apenas entregaram uma solução. Eles percorreram, dentro da ACONT, todas as etapas de um projeto real: identificaram o problema, estruturaram a solução, validaram com as áreas e implantaram em produção. Foi exatamente essa experiência, construída aqui dentro, que levou Samuel a fundar a Innovuz, uma startup em crescimento exponencial no mercado. Os 2 ainda estão conosco e estão presentes no Destine 26 aperfeiçoando suas habilidades, porque entendem que a ACONT e o MEJ ainda tem o que oferecer para quem quer continuar evoluindo."
      },
      {
        speaker: "Eloisa",
        text: "Isso é o que destaca uma EJ que forma de verdade: ela não entrega apenas projetos para os clientes. Ela entrega experiências reais para os membros, experiências que viram competência, competência que torna o mercado nordestino mais competitivo e colaborativo."
      }
    ]
  },
  {
    id: "fechamento",
    title: "5. FECHAMENTO",
    duration: "1:00",
    targetSeconds: 60,
    subtitle: "O bombardeio avassalador de métricas e o encerramento triunfante",
    visualHighlights: [
      "Metralhadora de dados e métricas reais (Efeito UAU)",
      "Protagonismo e formação de lideranças",
      "Chamada de impacto: Regina e Eloisa se apresentam com orgulho",
      "Frase de encerramento em coro"
    ],
    originalLines: [
      {
        speaker: "Regina",
        text: "98,4% de redução nos processos. R$ 24 mil economizados por ano. NPS de 4,9+. 87% de renovação. 92,6% de redução nas falhas. 97% de reversão dos encargos. 250 projetos em 18 estados. R$ 500 mil em seis meses.",
        highlighted: true,
        notes: "CLÍMAX: Aqui esses números têm impacto máximo porque NÃO foram ditos antes. É uma avalanche de resultados em menos de 10 segundos!"
      },
      {
        speaker: "Eloisa",
        text: "Mas o maior indicador desse case está no nosso time: pessoas que aprenderam na prática, construíram algo que nunca havia existido dentro da ACONT e provaram que a empresa não é apenas um lugar de execução, mas um espaço de protagonismo, inovação e transformação."
      },
      {
        speaker: "Regina",
        text: "Eu sou Regina Oliveira, Gerente de projetos da maior empresa júnior de contabilidade do Brasil."
      },
      {
        speaker: "Eloisa",
        text: "E eu sou Eloisa, da maior selva desse Brasil."
      },
      {
        speaker: "JUNTOS",
        text: "E esse é o nosso case, a prova de que quando a ACONT aposta em quem está dentro, ela não resolve apenas crises. Ela forma quem decide criar o futuro em vez de apenas reagir ao presente. Muito obrigado!"
      }
    ],
    modifiedLines: [
      {
        speaker: "Regina",
        text: "98,4% de redução nos processos. R$ 24 mil economizados por ano. NPS de 4,9+. 87% de renovação. 92,6% de redução nas falhas. 97% de reversão dos encargos. 250 projetos em 18 estados. R$ 500 mil em seis meses.",
        highlighted: true,
        notes: "CLÍMAX: Totalmente potencializado! Como não foi falado no FINAL, agora soa inédito, cirúrgico e avassalador!"
      },
      {
        speaker: "Eloisa",
        text: "Mas o maior indicador desse case está no nosso time: pessoas que aprenderam na prática, construíram algo que nunca havia existido dentro da ACONT e provaram que a empresa não é apenas um lugar de execução, mas um espaço de protagonismo, inovação e transformação."
      },
      {
        speaker: "Regina",
        text: "Eu sou Regina Oliveira, Gerente de projetos da maior empresa júnior de contabilidade do Brasil."
      },
      {
        speaker: "Eloisa",
        text: "E eu sou Eloisa, da maior selva desse Brasil."
      },
      {
        speaker: "JUNTOS",
        text: "E esse é o nosso case, a prova de que quando a ACONT aposta em quem está dentro, ela não resolve apenas crises. Ela forma quem decide criar o futuro em vez de apenas reagir ao presente. Muito obrigado!"
      }
    ]
  }
];
