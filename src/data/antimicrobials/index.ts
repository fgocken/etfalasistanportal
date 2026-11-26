import type { AntimicrobialMonographData } from './types';
import { BETA_LACTAM_ANTIMICROBIALS } from './betaLactamsData';
import { CARBAPENEM_BLBLI_ANTIMICROBIALS } from './carbapenemBlBliData';
import { GRAM_POSITIVE_MACROLIDE_ANTIMICROBIALS } from './gramPositiveAndMacrolidesData';
import { POLYMYXIN_AMINOGLYCOSIDE_ANTIMICROBIALS } from './polymyxinAndAminoglycosideData';

export type { AntimicrobialMonographData } from './types';

/**
 * 17 Yoğun Bakım & Perioperatif Antimikrobiyal Monografisi
 * (Sefazolin, Ampisilin-Sulbaktam, Seftriakson, Piperasilin-Tazobaktam, Sefepim,
 *  Meropenem, Seftazidim-Avibaktam, Sulbaktam, Vankomisin, Teikoplanin, Daptomisin,
 *  Polimiksin B, Kolistin, Amikasin, Klaritromisin, Azitromisin, Kaspofungin)
 */
const RAW_ALL: AntimicrobialMonographData[] = [
  ...BETA_LACTAM_ANTIMICROBIALS,
  ...CARBAPENEM_BLBLI_ANTIMICROBIALS,
  ...GRAM_POSITIVE_MACROLIDE_ANTIMICROBIALS,
  ...POLYMYXIN_AMINOGLYCOSIDE_ANTIMICROBIALS,
];

const PREFERRED_ORDER = [
  'cefazolin',
  'vancomycin',
  'ampicillin-sulbactam',
  'meropenem',
  'ceftriaxone',
  'clarithromycin',
  'piperacillin-tazobactam',
  'teicoplanin',
  'ceftazidime-avibactam',
  'polymyxin-b',
  'colistin',
  'daptomycin',
  'sulbactam',
  'cefepime',
  'azithromycin',
  'caspofungin',
  'amikacin',
];

export const ALL_ANTIMICROBIALS: AntimicrobialMonographData[] = [...RAW_ALL].sort((a, b) => {
  const ia = PREFERRED_ORDER.indexOf(a.id);
  const ib = PREFERRED_ORDER.indexOf(b.id);
  return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
});

export const ANTIMICROBIAL_MAP: Record<string, AntimicrobialMonographData> = Object.fromEntries(
  ALL_ANTIMICROBIALS.map((item) => [item.id, item])
);

export const ANTIMICROBIAL_ALIAS_MAP: Record<string, string> = ALL_ANTIMICROBIALS.reduce<Record<string, string>>(
  (acc, item) => {
    item.aliases.forEach((alias) => {
      acc[alias.toLowerCase()] = item.id;
    });
    return acc;
  },
  {}
);
