export function arcClause(text: string) {
  return text.trim().replace(/[.\s]+$/, '');
}

export function composeArcSummary(name: string, start: string, challenge: string, end: string) {
  const who = name.trim() || 'they';
  const plural = who === 'they';
  const sentences = [
    arcClause(start) && `In the beginning, ${who} ${plural ? 'believe' : 'believes'} ${arcClause(start)}.`,
    arcClause(challenge) && `Then ${arcClause(challenge)}.`,
    arcClause(end) && `By the end, ${who} ${plural ? 'understand' : 'understands'} ${arcClause(end)}.`,
  ].filter(Boolean);
  return sentences.join(' ');
}
