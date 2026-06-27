import { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Copy, 
  Check, 
  ChevronRight, 
  AlertTriangle, 
  TrendingUp, 
  Zap, 
  Users, 
  CheckCircle2, 
  Award, 
  Volume2, 
  MapPin, 
  Sparkles, 
  Clock, 
  FileText, 
  Undo, 
  MousePointerClick, 
  ArrowUpRight, 
  Layers, 
  Plus, 
  Minus,
  HelpCircle,
  Lightbulb,
  CornerDownRight,
  Monitor
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  SCRIPT_SECTIONS, 
  METRICS_DATA, 
  FIVE_WHYS_DATA, 
  GUT_MATRIX_DATA, 
  EXPLANATION_OF_CHANGES 
} from './data';
import { Speaker, ScriptSection, ScriptLine, MetricCard } from './types';

export default function App() {
  // Navigation & View States
  const [activeSectionId, setActiveSectionId] = useState<string>('inicio');
  const [scriptMode, setScriptMode] = useState<'modified' | 'original'>('modified');
  const [focusedSpeaker, setFocusedSpeaker] = useState<Speaker | 'ALL'>('ALL');
  const [prompterFontSize, setPrompterFontSize] = useState<number>(18);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  // Timer States
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [sectionElapsedSeconds, setSectionElapsedSeconds] = useState<Record<string, number>>({
    video: 0,
    inicio: 0,
    meio: 0,
    final: 0,
    fechamento: 0,
  });

  // Interactive Simulation States
  const [activeWhyStep, setActiveWhyStep] = useState<number>(1);
  const [processSimulationState, setProcessSimulationState] = useState<'idle' | 'before' | 'after'>('idle');
  const [selectedMetric, setSelectedMetric] = useState<MetricCard | null>(METRICS_DATA[0]);
  const [onboardingLevel, setOnboardingLevel] = useState<number>(1);
  const [onboardingExp, setOnboardingExp] = useState<number>(15);
  const [activeTab, setActiveTab] = useState<'prompter' | 'explanation'>('prompter');

  // Find current active section
  const currentSection = SCRIPT_SECTIONS.find(s => s.id === activeSectionId) || SCRIPT_SECTIONS[1];

  // Global stopwatch ticker
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setElapsedSeconds(prev => prev + 1);
        setSectionElapsedSeconds(prev => ({
          ...prev,
          [activeSectionId]: (prev[activeSectionId] || 0) + 1
        }));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, activeSectionId]);

  // Format seconds to MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getSectionTargetProgress = (id: string) => {
    const section = SCRIPT_SECTIONS.find(s => s.id === id);
    if (!section) return 0;
    const elapsed = sectionElapsedSeconds[id] || 0;
    const pct = (elapsed / section.targetSeconds) * 100;
    return Math.min(pct, 100);
  };

  const resetTimers = () => {
    setIsPlaying(false);
    setElapsedSeconds(0);
    setSectionElapsedSeconds({
      video: 0,
      inicio: 0,
      meio: 0,
      final: 0,
      fechamento: 0,
    });
  };

  const handleCopyScript = () => {
    // Generate full suggested script
    let fullScript = `=== ROTEIRO SUGERIDO DA APRESENTAÇÃO ACONT (COM AJUSTE DE MÉTRICAS) ===\n\n`;
    SCRIPT_SECTIONS.forEach(sec => {
      fullScript += `--- ${sec.title} (${sec.duration} min) ---\n`;
      sec.modifiedLines.forEach(line => {
        const nameLabel = line.speaker === 'SISTEMA' ? '' : `[${line.speaker}] `;
        fullScript += `${nameLabel}${line.text}\n`;
      });
      fullScript += `\n`;
    });

    navigator.clipboard.writeText(fullScript);
    setCopiedSection('full');
    setTimeout(() => setCopiedSection(null), 3000);
  };

  const handleLevelUpOnboarding = () => {
    if (onboardingLevel >= 5) {
      setOnboardingLevel(1);
      setOnboardingExp(15);
      return;
    }
    setOnboardingLevel(prev => prev + 1);
    setOnboardingExp(prev => Math.min(prev + 20, 100));
  };

  // Helper to highlight words diff
  const renderHighlightedScriptText = (text: string, isModified: boolean, isSectionFinal: boolean) => {
    if (!isSectionFinal) return <span>{text}</span>;

    // Highlight key changes in Section 4
    if (isModified) {
      if (text.includes("Com a operação unificada, os efeitos chegaram diretamente a quem nos contrata.")) {
        return (
          <span>
            <span className="bg-emerald-950/70 text-emerald-300 border-b border-emerald-500 px-1 py-0.5 rounded font-medium">
              Com a operação unificada, os efeitos chegaram diretamente a quem nos contrata. Mais do que otimização técnica, passamos a entregar um serviço blindado contra erros e de extrema fidelidade operacional.
            </span>{' '}
            Essa eficiência nos permitiu ir além da rotina:{' '}
            <span className="bg-emerald-950/70 text-emerald-300 border-b border-emerald-500 px-1 py-0.5 rounded font-medium">
              nossa atuação especializada interveio junto ao Estado, revertendo cobranças indevidas de impostos sobre clientes localizados em espaços universitários, devolvendo recursos reais para suas operações.
            </span>
          </span>
        );
      }
      if (text.includes("No agora, as ferramentas que desenvolvemos redesenharam nossa presença operacional")) {
        return (
          <span className="bg-emerald-950/70 text-emerald-300 border-b border-emerald-500 px-1 py-0.5 rounded font-medium">
            No agora, as ferramentas que desenvolvemos redesenharam nossa presença operacional, sendo a chave de entrada para expandirmos nossa marca e impactarmos clientes em escala de ponta a ponta no país.
          </span>
        );
      }
    } else {
      // Original
      if (text.includes("NPS de 4,9+, 87% de renovação e 92,6% de redução nas falhas operacionais.")) {
        return (
          <span>
            Com a operação unificada, os efeitos chegaram diretamente aos clientes:{' '}
            <span className="bg-amber-950/70 text-amber-300 border-b border-amber-500 px-1 py-0.5 rounded font-medium line-through">
              NPS de 4,9+, 87% de renovação e 92,6% de redução nas falhas operacionais.
            </span>{' '}
            A otimização técnica ampliada também permitiu reverter{' '}
            <span className="bg-amber-950/70 text-amber-300 border-b border-amber-500 px-1 py-0.5 rounded font-medium line-through">
              97% dos encargos
            </span>{' '}
            cobrados indevidamente pelo Estado sobre clientes em espaços universitários, devolvendo recursos reais a quem nos contrata.
          </span>
        );
      }
      if (text.includes("No agora, as plataformas foram a chave para mais de 200 clientes impactados")) {
        return (
          <span className="bg-amber-950/70 text-amber-300 border-b border-amber-500 px-1 py-0.5 rounded font-medium line-through">
            No agora, as plataformas foram a chave para mais de 200 clientes impactados, 250 projetos conduzidos em 18 estados e R$ 500 mil faturados em seis meses do ano.
          </span>
        );
      }
    }

    return <span>{text}</span>;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950 overflow-x-hidden" id="app_root">
      {/* HEADER SECTION */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 py-3 px-4 md:px-8" id="app_header">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-500 p-2 rounded-lg flex items-center justify-center text-slate-950 font-bold shadow-md shadow-emerald-500/10">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-900">
                  Case Destine '26
                </span>
                <span className="text-xs font-mono text-slate-400">v2.0 (Ajustado)</span>
              </div>
              <h1 className="font-display text-xl font-bold text-slate-100 tracking-tight">
                ACONT • Central do Case & Roteiro
              </h1>
            </div>
          </div>

          {/* Quick Stats Banner */}
          <div className="flex items-center gap-2 md:gap-4 flex-wrap bg-slate-950 p-1.5 rounded-lg border border-slate-800">
            <button 
              id="btn_tab_prompter"
              onClick={() => setActiveTab('prompter')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 ${activeTab === 'prompter' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <Monitor className="w-3.5 h-3.5" />
              Prompter & Simulador
            </button>
            <button 
              id="btn_tab_explanation"
              onClick={() => setActiveTab('explanation')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 relative ${activeTab === 'explanation' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <Lightbulb className="w-3.5 h-3.5" />
              Estratégia do Ajuste
              <span className="absolute -top-1 -right-1 bg-amber-500 w-2.5 h-2.5 rounded-full ring-2 ring-slate-950 animate-ping" />
            </button>
            <button 
              id="btn_copy_global"
              onClick={handleCopyScript}
              className="bg-slate-800 hover:bg-slate-700 text-slate-100 px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 border border-slate-700"
            >
              {copiedSection === 'full' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  Copiado!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copiar Roteiro Completo
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* STRATEGIC EXPLANATION NOTIFICATION BAR */}
      <div className="bg-gradient-to-r from-emerald-950/40 via-slate-950 to-emerald-950/40 border-b border-emerald-900/30 px-4 py-3 text-center text-xs text-slate-300" id="strategy_ticker">
        <p className="max-w-4xl mx-auto leading-relaxed">
          💡 <strong className="text-emerald-400">Resolvido:</strong> Transferimos os resultados quantitativos do <strong className="text-emerald-300">Final (Seção 4)</strong> diretamente para o <strong className="text-emerald-300">Fechamento (Seção 5)</strong>. A Eloisa agora faz um gancho puramente qualitativo sobre a reversão de impostos estaduais, eliminando o spoiler operacional e ampliando o clímax dramático da Regina no final.
        </p>
      </div>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8" id="main_layout">
        
        {/* VIEW 1: EXPLANATION TAB */}
        <AnimatePresence mode="wait">
          {activeTab === 'explanation' && (
            <motion.div 
              key="explanation_view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
              id="explanation_panel"
            >
              {/* Introduction & Comparison */}
              <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
                <div className="flex items-center gap-2 text-emerald-400 mb-4">
                  <Lightbulb className="w-6 h-6" />
                  <h2 className="font-display text-2xl font-bold">{EXPLANATION_OF_CHANGES.title}</h2>
                </div>
                
                <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                  A alteração solicitada resolve um clássico dilema de apresentações competitivas: a redundância de dados. Quando antecipamos todos os dados estáticos antes da hora, o encerramento perde sua força. Ao limparmos a seção 4 e concentrarmos a artilharia matemática no fechamento, geramos uma narrativa equilibrada com impacto crescente.
                </p>

                <h3 className="text-xs uppercase font-bold tracking-widest text-slate-400 mb-3 font-mono">
                  Por que essa alteração melhora a banca avaliadora?
                </h3>

                <div className="space-y-4">
                  {EXPLANATION_OF_CHANGES.points.map((pt, idx) => (
                    <div key={idx} className="bg-slate-950 border border-slate-800 rounded-lg p-4 flex gap-4">
                      <div className="bg-slate-900 text-emerald-400 border border-emerald-900/50 w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold font-mono text-sm">
                        {idx + 1}
                      </div>
                      <div>
                        <h4 className="font-display font-semibold text-slate-100 text-sm mb-1">{pt.title}</h4>
                        <p className="text-slate-400 text-xs leading-relaxed">{pt.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 border-t border-slate-800 pt-6">
                  <h3 className="font-display text-sm font-semibold text-slate-200 mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-400" />
                    Comparação de Impacto em Cena: Seção 4 (FINAL)
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs mt-2">
                    {/* Before Column */}
                    <div className="bg-amber-950/20 border border-amber-900/40 rounded-lg p-4">
                      <span className="text-amber-400 font-mono font-bold text-[10px] uppercase tracking-wider block mb-2">
                        ❌ Roteiro Original (Com Spoiler)
                      </span>
                      <p className="text-slate-300 italic mb-4 leading-relaxed">
                        "[Eloisa] Com a operação unificada, os efeitos chegaram diretamente aos clientes: <strong className="text-amber-300 bg-amber-950/60 px-1 rounded font-medium">NPS de 4,9+, 87% de renovação e 92,6% de redução nas falhas operacionais</strong>..."
                      </p>
                      <div className="text-amber-400 text-[11px] leading-relaxed flex gap-2">
                        <AlertTriangle className="w-4 h-4 shrink-0" />
                        <span>A banca ouve estes números e, 1 minuto depois, a Regina repete exatamente as mesmas métricas. Reduz o efeito dramático de encerramento.</span>
                      </div>
                    </div>

                    {/* After Column */}
                    <div className="bg-emerald-950/20 border border-emerald-900/40 rounded-lg p-4">
                      <span className="text-emerald-400 font-mono font-bold text-[10px] uppercase tracking-wider block mb-2">
                        ✅ Roteiro Alterado (Mais Emocional & Fluido)
                      </span>
                      <p className="text-slate-300 italic mb-4 leading-relaxed">
                        "[Eloisa] Com a operação unificada, os efeitos chegaram diretamente a quem nos contrata. <strong className="text-emerald-300 bg-emerald-950/60 px-1 rounded font-medium">Mais do que otimização técnica, passamos a entregar um serviço blindado contra erros e de extrema fidelidade contábil</strong>..."
                      </p>
                      <div className="text-emerald-400 text-[11px] leading-relaxed flex gap-2">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        <span>Foca na sensação de segurança do cliente e na vitória de reverter os impostos contábeis junto ao Estado, aguçando a curiosidade para a torrente de dados do final.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Strategic Advice Card */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between shadow-xl">
                <div>
                  <h3 className="font-display font-bold text-slate-100 text-lg mb-3 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-amber-500" />
                    Conselhos de Performance para Destine '26
                  </h3>
                  
                  <ul className="space-y-4 text-xs text-slate-400 leading-relaxed">
                    <li className="flex gap-2">
                      <span className="text-emerald-400 font-bold shrink-0">1.</span>
                      <span>
                        <strong className="text-slate-200">Acelere no Fechamento:</strong> Quando Regina iniciar a leitura dos números ("98,4% de redução..."), Eloisa deve manter contato visual estático com o público e Regina deve ditar as métricas de forma limpa, veloz e triunfante, como quem recita medalhas olímpicas.
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-emerald-400 font-bold shrink-0">2.</span>
                      <span>
                        <strong className="text-slate-200">Expressão Corporal:</strong> No FINAL (Seção 4), quando Eloisa descrever a reversão de impostos estaduais indevidos, utilize tom de voz maduro e confiante: afinal, reverter impostos do Estado é um feito gigantesco para qualquer escritório sênior, imagina para uma EJ do Nordeste!
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-emerald-400 font-bold shrink-0">3.</span>
                      <span>
                        <strong className="text-slate-200">Sincronia do Coro final:</strong> Treinem exaustivamente a frase final juntas: <span className="text-emerald-400">"E esse é o nosso case, a prova de que quando a ACONT aposta em quem está dentro..."</span>. O coro deve soar uníssono, com energia máxima.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-850">
                  <button
                    onClick={() => {
                      setActiveTab('prompter');
                      setActiveSectionId('final');
                    }}
                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold py-2.5 rounded-lg text-xs transition-all flex items-center justify-center gap-2"
                  >
                    Ver Ajuste no Prompter
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* VIEW 2: PROMPTER & SIMULATOR TAB */}
        <AnimatePresence mode="wait">
          {activeTab === 'prompter' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="prompter_view_container">
              
              {/* LEFT SIDE: SCRIPT SECTIONS NAVIGATION & CHRONOMETER (4 Cols) */}
              <div className="lg:col-span-4 flex flex-col gap-6" id="sidebar_nav_timers">
                
                {/* 1. Master presentation clock */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl pointer-events-none" />
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">Cronômetro de Ensaio</span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-950 text-emerald-400 border border-slate-800">
                      Total: 10:00 min max
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4 py-2">
                    <div className="font-mono text-4xl font-bold tracking-tight text-slate-100 flex items-center">
                      <Clock className="w-8 h-8 text-emerald-500 mr-2.5 animate-pulse" />
                      {formatTime(elapsedSeconds)}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button 
                        id="btn_timer_toggle"
                        onClick={() => setIsPlaying(!isPlaying)}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${isPlaying ? 'bg-amber-500 hover:bg-amber-400 text-slate-950' : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/10'}`}
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                      </button>
                      <button 
                        id="btn_timer_reset"
                        onClick={resetTimers}
                        className="w-10 h-10 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg flex items-center justify-center border border-slate-700 transition-all"
                        title="Zerar Cronômetro"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Section progress indicator bar */}
                  <div className="mt-4 pt-4 border-t border-slate-800/80">
                    <div className="flex justify-between text-xs text-slate-400 mb-1.5">
                      <span>Tempo gasto na Seção Atual:</span>
                      <span className="font-mono text-slate-200">
                        {formatTime(sectionElapsedSeconds[activeSectionId] || 0)} / {currentSection.duration} min
                      </span>
                    </div>
                    <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                      <div 
                        className={`h-full transition-all duration-300 ${getSectionTargetProgress(activeSectionId) > 100 ? 'bg-red-500' : 'bg-emerald-500'}`}
                        style={{ width: `${getSectionTargetProgress(activeSectionId)}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Script Timeline Sections */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl">
                  <h3 className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-3 font-mono">
                    Roteiro de Apresentação
                  </h3>

                  <div className="space-y-2">
                    {SCRIPT_SECTIONS.map((section) => {
                      const isActive = section.id === activeSectionId;
                      const hasAjuste = section.id === 'final';
                      
                      return (
                        <button
                          key={section.id}
                          id={`nav_sec_${section.id}`}
                          onClick={() => setActiveSectionId(section.id)}
                          className={`w-full text-left p-3 rounded-lg border transition-all relative flex flex-col gap-1 ${
                            isActive 
                              ? 'bg-slate-950 border-emerald-500 text-white shadow-lg' 
                              : 'bg-slate-900/50 hover:bg-slate-850 border-slate-800 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          <div className="flex items-center justify-between w-full">
                            <span className="font-display font-semibold text-sm">
                              {section.title}
                            </span>
                            <span className="text-xs font-mono bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-slate-300">
                              {section.duration} min
                            </span>
                          </div>
                          
                          <span className="text-xs truncate max-w-xs">{section.subtitle}</span>

                          {hasAjuste && (
                            <span className="absolute top-1/2 right-20 -translate-y-1/2 bg-emerald-500/15 text-emerald-400 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded uppercase border border-emerald-500/30">
                              Ajustado
                            </span>
                          )}

                          {isActive && (
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500 rounded-l-lg" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Speaker Filter / Highlighter */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl">
                  <h3 className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-3 font-mono">
                    Foco de Speaker (Destaque)
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      id="focus_all"
                      onClick={() => setFocusedSpeaker('ALL')}
                      className={`py-2 px-3 rounded-lg border text-center transition-all font-medium ${focusedSpeaker === 'ALL' ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'}`}
                    >
                      Todos
                    </button>
                    <button
                      id="focus_juntos"
                      onClick={() => setFocusedSpeaker('JUNTOS')}
                      className={`py-2 px-3 rounded-lg border text-center transition-all font-medium ${focusedSpeaker === 'JUNTOS' ? 'bg-amber-500/20 border-amber-500/50 text-amber-300' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'}`}
                    >
                      Juntos 👥
                    </button>
                    <button
                      id="focus_eloisa"
                      onClick={() => setFocusedSpeaker('Eloisa')}
                      className={`py-2.5 px-3 rounded-lg border text-left transition-all flex flex-col gap-0.5 ${focusedSpeaker === 'Eloisa' ? 'bg-teal-500/20 border-teal-500 text-teal-300' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'}`}
                    >
                      <span className="font-bold text-xs">Eloisa</span>
                      <span className="text-[10px] opacity-80">Membro 2026.1</span>
                    </button>
                    <button
                      id="focus_regina"
                      onClick={() => setFocusedSpeaker('Regina')}
                      className={`py-2.5 px-3 rounded-lg border text-left transition-all flex flex-col gap-0.5 ${focusedSpeaker === 'Regina' ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'}`}
                    >
                      <span className="font-bold text-xs">Regina</span>
                      <span className="text-[10px] opacity-80">Gerente de Proj.</span>
                    </button>
                  </div>
                </div>

              </div>

              {/* CENTER COMPONENT: THE SCRIPT PROMPTER (5 Cols) */}
              <div className="lg:col-span-5 flex flex-col gap-4" id="prompter_script_container">
                <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-xl flex flex-col h-full flex-grow">
                  
                  {/* Prompter Header controls */}
                  <div className="border-b border-slate-800 p-4 flex items-center justify-between flex-wrap gap-3 bg-slate-900/90 sticky top-0 rounded-t-xl z-10">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-emerald-400" />
                      <h3 className="font-display font-semibold text-sm text-slate-100">
                        Texto de Leitura (Prompter)
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Font controls */}
                      <div className="flex items-center bg-slate-950 rounded border border-slate-800 p-0.5 text-xs">
                        <button 
                          id="btn_font_decrease"
                          onClick={() => setPrompterFontSize(p => Math.max(14, p - 2))}
                          className="p-1 hover:text-white text-slate-400"
                          title="Diminuir Fonte"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 font-mono text-[10px]">{prompterFontSize}px</span>
                        <button 
                          id="btn_font_increase"
                          onClick={() => setPrompterFontSize(p => Math.min(26, p + 2))}
                          className="p-1 hover:text-white text-slate-400"
                          title="Aumentar Fonte"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Script version switcher */}
                      <div className="flex items-center bg-slate-950 rounded border border-slate-800 p-0.5 text-xs">
                        <button
                          id="btn_mode_modified"
                          onClick={() => setScriptMode('modified')}
                          className={`px-2 py-1 rounded transition-all text-[11px] font-medium ${scriptMode === 'modified' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
                        >
                          Ajustado
                        </button>
                        <button
                          id="btn_mode_original"
                          onClick={() => setScriptMode('original')}
                          className={`px-2 py-1 rounded transition-all text-[11px] font-medium ${scriptMode === 'original' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
                        >
                          Original
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Warning if showing original */}
                  {scriptMode === 'original' && (
                    <div className="bg-amber-950/40 border-b border-amber-900/50 p-3 text-[11px] text-amber-300 flex gap-2">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span>
                        Você está vendo o <strong>roteiro original</strong>. Nele, a Eloisa diz os resultados no Final (Seção 4), estragando a surpresa do Fechamento.
                      </span>
                    </div>
                  )}

                  {/* Prompter Text body */}
                  <div className="p-5 flex-grow overflow-y-auto max-h-[580px] bg-slate-950/50 rounded-b-xl">
                    <div className="space-y-6">
                      
                      {/* Print the speech lines */}
                      {(scriptMode === 'modified' ? currentSection.modifiedLines : currentSection.originalLines).map((line, idx) => {
                        const isSystem = line.speaker === 'SISTEMA';
                        const isSpeakingEloisa = line.speaker === 'Eloisa';
                        const isSpeakingRegina = line.speaker === 'Regina';
                        const isSpeakingJuntos = line.speaker === 'JUNTOS';
                        
                        // Speaker Highlight check
                        const isDimmed = focusedSpeaker !== 'ALL' && focusedSpeaker !== line.speaker;

                        return (
                          <div 
                            key={idx} 
                            className={`transition-all duration-300 rounded-xl ${
                              isSystem 
                                ? 'bg-slate-900/60 border border-slate-800 p-3.5 text-slate-400 italic text-xs' 
                                : isDimmed 
                                  ? 'opacity-25 scale-98 pointer-events-none'
                                  : 'border-l-4 pl-4 py-2 border-slate-800'
                            } ${
                              !isSystem && isSpeakingEloisa && !isDimmed ? 'border-teal-500 bg-teal-950/5' : ''
                            } ${
                              !isSystem && isSpeakingRegina && !isDimmed ? 'border-indigo-500 bg-indigo-950/5' : ''
                            } ${
                              !isSystem && isSpeakingJuntos && !isDimmed ? 'border-amber-500 bg-amber-950/5' : ''
                            }`}
                          >
                            {!isSystem && (
                              <div className="flex items-center gap-2 mb-1">
                                <span className={`text-[10px] font-mono uppercase font-bold tracking-wider px-2 py-0.5 rounded ${
                                  isSpeakingEloisa 
                                    ? 'bg-teal-950 text-teal-300 border border-teal-800' 
                                    : isSpeakingRegina 
                                      ? 'bg-indigo-950 text-indigo-300 border border-indigo-800' 
                                      : 'bg-amber-950 text-amber-300 border border-amber-800'
                                }`}>
                                  {line.speaker}
                                </span>
                                
                                {line.notes && (
                                  <span className="text-[10px] text-slate-500 italic">
                                    ({line.notes})
                                  </span>
                                )}
                              </div>
                            )}

                            <p 
                              className={`leading-relaxed tracking-normal font-sans font-normal ${isSystem ? 'font-mono' : ''}`}
                              style={{ 
                                fontSize: isSystem ? `${prompterFontSize - 3}px` : `${prompterFontSize}px`,
                                color: isSystem ? '#94a3b8' : '#f1f5f9'
                              }}
                            >
                              {renderHighlightedScriptText(line.text, scriptMode === 'modified', currentSection.id === 'final')}
                            </p>

                            {/* Diff Help Message inside the speech */}
                            {currentSection.id === 'final' && line.highlighted && (
                              <div className={`mt-2 text-[10px] font-mono px-2 py-1 rounded flex items-center gap-1.5 ${
                                scriptMode === 'modified' 
                                  ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-900/50' 
                                  : 'bg-amber-950/50 text-amber-400 border border-amber-900/50'
                              }`}>
                                <CornerDownRight className="w-3.5 h-3.5" />
                                <span>
                                  {scriptMode === 'modified' 
                                    ? 'Foco no valor qualitativo (reverter impostos universitários). Sem antecipar números!' 
                                    : 'Aviso: Esta frase repete o NPS e o faturamento, enfraquecendo o final.'
                                  }
                                </span>
                              </div>
                            )}
                          </div>
                        );
                      })}

                    </div>
                  </div>

                  {/* Copy current section text button */}
                  <div className="border-t border-slate-800 p-3 bg-slate-900/50 flex justify-between items-center text-xs">
                    <span className="text-slate-500">Pratique cada seção separadamente</span>
                    
                    <button
                      id="btn_copy_section"
                      onClick={() => {
                        let text = `=== ACONT CASE - ${currentSection.title} ===\n\n`;
                        const lines = scriptMode === 'modified' ? currentSection.modifiedLines : currentSection.originalLines;
                        lines.forEach(l => {
                          text += `${l.speaker === 'SISTEMA' ? '' : `[${l.speaker}] `}${l.text}\n`;
                        });
                        navigator.clipboard.writeText(text);
                        setCopiedSection(currentSection.id);
                        setTimeout(() => setCopiedSection(null), 2000);
                      }}
                      className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-1 rounded transition-all flex items-center gap-1.5 font-medium"
                    >
                      {copiedSection === currentSection.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          Copiado!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          Copiar esta fala
                        </>
                      )}
                    </button>
                  </div>

                </div>
              </div>

              {/* RIGHT SIDE: DYNAMIC INTERACTIVE SLIDES/WIDGETS (3 Cols) */}
              <div className="lg:col-span-3 flex flex-col gap-6" id="interactive_slides_preview">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl flex-grow flex flex-col justify-between">
                  
                  {/* Slide header */}
                  <div>
                    <div className="flex items-center gap-2 mb-3 pb-3 border-b border-slate-800">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <h4 className="font-display font-bold text-xs uppercase tracking-widest text-slate-300">
                        Slide Interativo Prévia
                      </h4>
                    </div>

                    {/* DYNAMIC CONTENT PER ACTIVE SECTION */}
                    <AnimatePresence mode="wait">
                      
                      {/* SECTION 1: VIDEO */}
                      {activeSectionId === 'video' && (
                        <motion.div
                          key="slide_video"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="space-y-4"
                        >
                          <div className="bg-slate-950 aspect-video rounded-lg border border-slate-800 flex flex-col items-center justify-center p-4 relative overflow-hidden text-center">
                            
                            {/* Visual glowing radar for "Onda Verde" audio wave */}
                            <div className="absolute inset-0 flex items-center justify-center gap-1 opacity-25">
                              <span className="w-1.5 h-12 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                              <span className="w-1.5 h-20 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                              <span className="w-1.5 h-28 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
                              <span className="w-1.5 h-16 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                              <span className="w-1.5 h-8 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                            </div>

                            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-900 z-10 uppercase tracking-widest animate-pulse">
                              Introdução Rodando
                            </span>
                            <h5 className="font-display font-bold text-slate-200 mt-3 text-sm z-10 leading-tight">
                              "Inovação não tem CEP: Nordeste Quebra a Narrativa"
                            </h5>
                          </div>

                          <div className="bg-slate-950 border border-slate-850 p-3 rounded-lg text-xs space-y-1.5 text-slate-400">
                            <span className="text-slate-200 font-semibold block">Dica do Slide:</span>
                            <p className="leading-normal">
                              Inicie o cronômetro assim que o vídeo terminar e as palmas cessarem. Fique na posição centralizada.
                            </p>
                          </div>
                        </motion.div>
                      )}

                      {/* SECTION 2: INICIO (Crise Operacional) */}
                      {activeSectionId === 'inicio' && (
                        <motion.div
                          key="slide_inicio"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="space-y-4"
                        >
                          <h5 className="font-display font-bold text-sm text-slate-200">
                            A Crise de Crescimento em 2025
                          </h5>

                          <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 space-y-3">
                            <div className="flex justify-between items-center text-xs border-b border-slate-800 pb-2">
                              <span className="text-slate-400">Faturamento 2025</span>
                              <span className="text-emerald-400 font-bold font-mono">Alta Histórica ▲</span>
                            </div>
                            
                            <div className="flex justify-between items-center text-xs border-b border-slate-800 pb-2">
                              <span className="text-slate-400">Eficiência Interna</span>
                              <span className="text-red-400 font-bold font-mono">Queda Crítica ▼</span>
                            </div>

                            {/* Overload Stress Indicator widget */}
                            <div className="space-y-1.5 pt-1">
                              <div className="flex justify-between text-[10px]">
                                <span className="text-slate-400 font-medium">Estresse Operacional</span>
                                <span className="text-red-400 font-mono font-bold">100% Crítico</span>
                              </div>
                              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                                <div className="bg-gradient-to-r from-amber-500 to-red-500 h-full w-full" />
                              </div>
                            </div>
                          </div>

                          {/* 7 Resignations Alert Card */}
                          <div className="bg-red-950/25 border border-red-900/40 p-3 rounded-lg flex items-start gap-2.5">
                            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                            <div>
                              <span className="text-xs font-bold text-red-300 block">7 Desligamentos</span>
                              <p className="text-[10px] text-slate-400 leading-normal">
                                Demissões motivadas exclusivamente por sobrecarga física e mental em 22 anos.
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* SECTION 3: MEIO (Diagnostics & Solutions) */}
                      {activeSectionId === 'meio' && (
                        <motion.div
                          key="slide_meio"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="space-y-4"
                        >
                          <h5 className="font-display font-bold text-sm text-slate-200">
                            Diagnóstico & Resolução do Time
                          </h5>

                          {/* Quick sub-selector for tabs within Meio Slide to save token limits */}
                          <div className="bg-slate-950 rounded-lg p-3 border border-slate-800 space-y-3">
                            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 font-mono block">
                              Simulador Antes vs Depois
                            </span>

                            {processSimulationState === 'idle' && (
                              <div className="text-center py-4 space-y-2">
                                <p className="text-xs text-slate-400">Veja o impacto operacional da automação unificada.</p>
                                <div className="flex gap-2 justify-center">
                                  <button 
                                    id="btn_sim_before"
                                    onClick={() => setProcessSimulationState('before')}
                                    className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 px-3 py-1.5 rounded text-xs font-medium border border-amber-500/30 transition-all"
                                  >
                                    Ver ANTES
                                  </button>
                                  <button 
                                    id="btn_sim_after"
                                    onClick={() => setProcessSimulationState('after')}
                                    className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 px-3 py-1.5 rounded text-xs font-medium border border-emerald-500/30 transition-all"
                                  >
                                    Ver DEPOIS
                                  </button>
                                </div>
                              </div>
                            )}

                            {processSimulationState === 'before' && (
                              <div className="space-y-2">
                                <div className="flex justify-between items-center text-xs">
                                  <span className="text-amber-400 font-bold">Processo Descentralizado</span>
                                  <button 
                                    id="btn_sim_reset_before"
                                    onClick={() => setProcessSimulationState('idle')} 
                                    className="text-[10px] text-slate-500 underline"
                                  >
                                    Voltar
                                  </button>
                                </div>
                                <div className="text-[10px] space-y-1.5 text-slate-400 bg-slate-900/60 p-2 rounded">
                                  <div className="flex items-center gap-1 text-red-400">
                                    <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-ping" />
                                    <span>Planilhas isoladas (1 dia)</span>
                                  </div>
                                  <div className="pl-2 border-l border-slate-800">Conferência manual (1-2 dias)</div>
                                  <div className="pl-2 border-l border-slate-800 text-red-300">Retrabalho frequente (1 dia)</div>
                                </div>
                                <div className="bg-red-950/20 border border-red-900/30 px-2 py-1.5 rounded text-[10px] text-red-300 font-mono text-center">
                                  Tempo total: 3 a 4 Dias
                                </div>
                              </div>
                            )}

                            {processSimulationState === 'after' && (
                              <div className="space-y-2">
                                <div className="flex justify-between items-center text-xs">
                                  <span className="text-emerald-400 font-bold">Plataforma do Samuel</span>
                                  <button 
                                    id="btn_sim_reset_after"
                                    onClick={() => setProcessSimulationState('idle')} 
                                    className="text-[10px] text-slate-500 underline"
                                  >
                                    Voltar
                                  </button>
                                </div>
                                <div className="text-[10px] space-y-1.5 text-slate-400 bg-slate-900/60 p-2 rounded">
                                  <div className="flex items-center gap-1 text-emerald-400 font-bold">
                                    <Zap className="w-3.5 h-3.5" />
                                    <span>Integração de APIs</span>
                                  </div>
                                  <div className="pl-2 border-l border-emerald-850">Conciliação instantânea por cliente</div>
                                  <div className="pl-2 border-l border-emerald-850 text-emerald-300">100 livros diários em 30 dias</div>
                                </div>
                                <div className="bg-emerald-950/30 border border-emerald-500/30 px-2 py-1.5 rounded text-[10px] text-emerald-300 font-mono text-center font-bold">
                                  Tempo total: &lt; 1 Hora (Redução de 98,4%)
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Talent Redistribution chart */}
                          <div className="bg-slate-950 border border-slate-800 p-3 rounded-lg space-y-2">
                            <span className="text-[10px] font-mono text-slate-400 block font-bold uppercase">
                              Redistribuição de Talentos
                            </span>
                            <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                              <div className="bg-slate-900 p-1.5 rounded border border-slate-800">
                                <span className="block text-emerald-400 font-bold text-xs">+4</span>
                                <span className="text-slate-500">Presidência</span>
                              </div>
                              <div className="bg-slate-900 p-1.5 rounded border border-slate-800">
                                <span className="block text-emerald-400 font-bold text-xs">+5</span>
                                <span className="text-slate-500">Vice-Pres.</span>
                              </div>
                              <div className="bg-slate-900 p-1.5 rounded border border-slate-800">
                                <span className="block text-emerald-400 font-bold text-xs">+9</span>
                                <span className="text-slate-500">Comarketing</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* SECTION 4: FINAL (Pedagogia do MEJ) */}
                      {activeSectionId === 'final' && (
                        <motion.div
                          key="slide_final"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="space-y-4"
                        >
                          <h5 className="font-display font-bold text-sm text-slate-200">
                            A Pedagogia Prática da ACONT
                          </h5>

                          {/* Samuel's Innovuz Startup node */}
                          <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 space-y-2">
                            <div className="flex items-center gap-2 text-xs font-bold text-teal-400">
                              <TrendingUp className="w-4 h-4 text-emerald-400" />
                              <span>De Membro a Fundador</span>
                            </div>
                            <p className="text-[10px] text-slate-400 leading-normal">
                              Samuel percorreu todo o ciclo real de projetos e fundou a <strong className="text-slate-200">Innovuz</strong>, startup em crescimento exponencial.
                            </p>
                            <div className="flex justify-between items-center bg-slate-900 p-1.5 rounded text-[10px]">
                              <span className="text-slate-500">Startup Innovuz</span>
                              <span className="text-emerald-400 font-semibold font-mono">Tração de Mercado ▲</span>
                            </div>
                          </div>

                          {/* Eloisa's Gamified onboarding preview */}
                          <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 space-y-2">
                            <div className="flex justify-between items-center text-xs">
                              <span className="font-bold text-indigo-400">Onboarding Gamificado</span>
                              <span className="text-[9px] font-mono bg-indigo-950 px-1.5 py-0.5 rounded border border-indigo-900 text-indigo-300">
                                Eloisa 2026.1
                              </span>
                            </div>
                            
                            <div className="bg-slate-900 p-2 rounded flex items-center justify-between">
                              <div>
                                <span className="text-[9px] text-slate-500 block">Nível do Novo Membro:</span>
                                <span className="text-xs font-bold text-slate-200">Level {onboardingLevel} • Gestor Sênior</span>
                              </div>
                              <button 
                                id="btn_simulate_levelup"
                                onClick={handleLevelUpOnboarding}
                                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-2 py-1 rounded text-[10px] font-bold"
                              >
                                {onboardingLevel === 5 ? 'Reiniciar' : 'Subir LVL'}
                              </button>
                            </div>
                            
                            {/* XP Progress Bar */}
                            <div className="space-y-1">
                              <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                                <div 
                                  className="bg-indigo-500 h-full transition-all duration-300"
                                  style={{ width: `${(onboardingLevel / 5) * 100}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* SECTION 5: FECHAMENTO (Avalanche of metrics) */}
                      {activeSectionId === 'fechamento' && (
                        <motion.div
                          key="slide_fechamento"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="space-y-4"
                        >
                          <div className="flex items-center justify-between">
                            <h5 className="font-display font-bold text-sm text-emerald-400">
                              Os Números do Case
                            </h5>
                            <span className="text-[9px] font-mono text-slate-500">Clique para expandir</span>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-left">
                            {METRICS_DATA.map((metric) => {
                              const isSelected = selectedMetric?.id === metric.id;
                              return (
                                <button
                                  key={metric.id}
                                  id={`metric_card_${metric.id}`}
                                  onClick={() => setSelectedMetric(metric)}
                                  className={`p-2 rounded-lg border transition-all text-left ${
                                    isSelected 
                                      ? 'bg-emerald-950/40 border-emerald-500/80 shadow' 
                                      : 'bg-slate-950 border-slate-850 hover:border-slate-800'
                                  }`}
                                >
                                  <span className="block font-mono font-bold text-base text-slate-100 leading-tight">
                                    {metric.prefix}{metric.value}{metric.suffix}
                                  </span>
                                  <span className="text-[9px] text-slate-400 block truncate mt-0.5 leading-none">
                                    {metric.label}
                                  </span>
                                </button>
                              );
                            })}
                          </div>

                          {/* Selected Metric Deep Dive */}
                          {selectedMetric && (
                            <div className="bg-slate-950 border border-slate-850 p-2.5 rounded-lg text-[11px] leading-relaxed">
                              <span className="font-bold text-emerald-400 block mb-0.5">
                                {selectedMetric.label}:
                              </span>
                              <p className="text-slate-400">{selectedMetric.description}</p>
                            </div>
                          )}
                        </motion.div>
                      )}

                    </AnimatePresence>

                  </div>

                  {/* Slide controls / presentation advice footer */}
                  <div className="border-t border-slate-800/80 pt-4 mt-4 text-[10px] text-slate-400 space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Status da Apresentação:</span>
                      <span className={`font-mono font-bold px-1.5 py-0.5 rounded text-[9px] ${isPlaying ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-950 text-slate-500'}`}>
                        {isPlaying ? 'ENSANDO AO VIVO' : 'PAUSADO'}
                      </span>
                    </div>
                    <p className="leading-normal italic text-slate-500">
                      "A inovação nasce na base. Samuel e Eloisa provaram isso na prática, dentro da ACONT."
                    </p>
                  </div>

                </div>
              </div>

            </div>
          )}
        </AnimatePresence>

        {/* DETAILED METHODOLOGY & WORKINGS EXPANDER (GUT & 5 WHYS) */}
        <section className="mt-8 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl" id="methodology_section">
          <div className="flex items-center gap-2 text-slate-100 mb-6 border-b border-slate-800 pb-3">
            <Layers className="w-5 h-5 text-emerald-400" />
            <h3 className="font-display font-bold text-lg">
              Instrumentalização Técnica do Case
            </h3>
            <span className="text-xs text-slate-400 font-normal ml-auto">
              Utilize esta seção para treinar as perguntas da banca sobre a Metodologia
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Column 1: Interactive 5 Whys */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
                  Os 5 Porquês do Diagnóstico
                </span>
                <span className="text-[10px] text-slate-500">Clique para avançar</span>
              </div>

              <div className="bg-slate-950 border border-slate-850 rounded-lg p-4 space-y-3">
                {FIVE_WHYS_DATA.map((node) => {
                  const isPast = node.step < activeWhyStep;
                  const isCurrent = node.step === activeWhyStep;
                  
                  return (
                    <button
                      key={node.step}
                      id={`why_btn_${node.step}`}
                      onClick={() => setActiveWhyStep(node.step)}
                      className={`w-full text-left p-2.5 rounded transition-all text-xs border ${
                        isCurrent 
                          ? 'bg-slate-900 border-emerald-500/80 text-white' 
                          : isPast 
                            ? 'bg-slate-950 border-slate-850 text-slate-400 opacity-60' 
                            : 'bg-slate-950 border-slate-900 text-slate-600 opacity-30 hover:opacity-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-[10px] font-mono text-emerald-400 uppercase">
                          Porquê #{node.step}
                        </span>
                        {isPast && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                      </div>
                      <p className="font-semibold text-[11px] mb-1">{node.question}</p>
                      
                      {isCurrent && (
                        <p className="text-[11px] text-slate-300 pl-2 border-l-2 border-emerald-500 mt-1.5 pt-0.5 leading-relaxed bg-slate-950/80 p-1.5 rounded">
                          {node.answer}
                        </p>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Column 2: GUT Matrix Deep Dive */}
            <div className="space-y-4">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono block">
                Matriz GUT: Priorização do Problema
              </span>

              <div className="space-y-3">
                {GUT_MATRIX_DATA.map((item, idx) => (
                  <div key={idx} className="bg-slate-950 border border-slate-850 rounded-lg p-3.5">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-display font-semibold text-xs text-slate-200">
                        {item.criterion}
                      </span>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span 
                            key={star} 
                            className={`w-2.5 h-2.5 rounded-full ${
                              star <= item.score ? 'bg-red-500' : 'bg-slate-800'
                            }`} 
                          />
                        ))}
                        <span className="text-[10px] font-bold font-mono text-red-400 ml-1">
                          Nota {item.score}/5
                        </span>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-normal">{item.description}</p>
                  </div>
                ))}
              </div>

              <div className="bg-emerald-950/20 border border-emerald-900/30 p-3 rounded-lg text-xs leading-relaxed text-slate-300">
                <span className="font-bold text-emerald-400 block mb-0.5">Resultado da GUT:</span>
                Multiplicando os índices (G x U x T), a <strong className="text-white">Fragmentação Tecnológica</strong> obteve o score máximo de <strong className="text-emerald-400">125 pontos</strong>, definindo-a como o foco imediato de salvação operacional.
              </div>
            </div>

          </div>
        </section>

      </main>

      {/* FOOTER SECTION */}
      <footer className="border-t border-slate-800 bg-slate-900/40 py-6 mt-12 text-center text-xs text-slate-500" id="app_footer_bottom">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p>
            Desenvolvido sob medida para a <strong className="text-slate-300">ACONT Empresa Júnior de Contabilidade</strong>. Todos os direitos reservados.
          </p>
          <p className="text-[10px] text-slate-600">
            Apresentação formatada para o Destine 2026. Feito com orgulho no Nordeste brasileiro.
          </p>
        </div>
      </footer>
    </div>
  );
}
