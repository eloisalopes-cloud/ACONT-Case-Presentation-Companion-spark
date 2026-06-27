export type Speaker = 'Eloisa' | 'Regina' | 'JUNTOS' | 'SISTEMA';

export interface ScriptSection {
  id: string;
  title: string;
  duration: string; // e.g., "1:30"
  targetSeconds: number; // in seconds
  subtitle: string;
  originalLines: ScriptLine[];
  modifiedLines: ScriptLine[];
  visualHighlights: string[];
}

export interface ScriptLine {
  speaker: Speaker;
  text: string;
  highlighted?: boolean;
  notes?: string;
}

export interface MetricCard {
  id: string;
  value: string;
  label: string;
  suffix?: string;
  prefix?: string;
  description: string;
  category: 'efficiency' | 'financial' | 'client' | 'scale';
}

export interface FiveWhysNode {
  step: number;
  question: string;
  answer: string;
}

export interface GUTItem {
  criterion: string;
  score: number;
  description: string;
}
