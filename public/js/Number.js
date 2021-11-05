function shortNumber(){
  const tab = ['y', 'z', 'e', 'p', 't', 'g', 'm', 'k']
  for (let i = 24, y = 0; i > 0; i -= 3, y++) if (this >= 10 ** i) return (this / 10 ** i).toFixed((this / 10 ** i).toFixed(1).toString().includes('.0') ? 0 : 1) + tab[y].toUpperCase()
  return this
}