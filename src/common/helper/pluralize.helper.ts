export function getPluralize() {
  const vowels = "aeiou";
  const irregulars: { [key: string]: string } = {
    addendum: "addenda",
    aircraft: "aircraft",
    alumna: "alumnae",
    alumnus: "alumni",
    analysis: "analyses",
    antenna: "antennae",
    antithesis: "antitheses",
    apex: "apices",
    appendix: "appendices",
    axis: "axes",
    bacillus: "bacilli",
    bacterium: "bacteria",
    basis: "bases",
    beau: "beaux",
    bison: "bison",
    bureau: "bureaux",
    cactus: "cacti",
    child: "children",
    codex: "codices",
    concerto: "concerti",
    corpus: "corpora",
    crisis: "crises",
    criterion: "criteria",
    curriculum: "curricula",
    datum: "data",
    deer: "deer",
    diagnosis: "diagnoses",
    die: "dice",
    dwarf: "dwarves",
    ellipsis: "ellipses",
    erratum: "errata",
    "faux pas": "faux pas",
    fez: "fezzes",
    fish: "fish",
    focus: "foci",
    foot: "feet",
    formula: "formulae",
    fungus: "fungi",
    genus: "genera",
    goose: "geese",
    graffito: "graffiti",
    grouse: "grouse",
    half: "halves",
    hoof: "hooves",
    hypothesis: "hypotheses",
    index: "indices",
    larva: "larvae",
    libretto: "libretti",
    loaf: "loaves",
    locus: "loci",
    louse: "lice",
    man: "men",
    matrix: "matrices",
    medium: "media",
    memorandum: "memoranda",
    minutia: "minutiae",
    moose: "moose",
    mouse: "mice",
    nebula: "nebulae",
    nucleus: "nuclei",
    oasis: "oases",
    offspring: "offspring",
    opus: "opera",
    ovum: "ova",
    ox: "oxen",
    parenthesis: "parentheses",
    phenomenon: "phenomena",
    phylum: "phyla",
    quiz: "quizzes",
    radius: "radii",
    referendum: "referenda",
    salmon: "salmon",
    scarf: "scarves",
    self: "selves",
    series: "series",
    sheep: "sheep",
    shrimp: "shrimp",
    species: "species",
    stimulus: "stimuli",
    stratum: "strata",
    swine: "swine",
    syllabus: "syllabi",
    symposium: "symposia",
    synopsis: "synopses",
    tableau: "tableaux",
    thesis: "theses",
    thief: "thieves",
    tooth: "teeth",
    trout: "trout",
    tuna: "tuna",
    vertebra: "vertebrae",
    vertex: "vertices",
    vita: "vitae",
    vortex: "vortices",
    wharf: "wharves",
    wife: "wives",
    wolf: "wolves",
    woman: "women",
    guy: "guys",
    buy: "buys",
    person: "people",
  };

  function pluralize(word: string): string {
    word = word.toLowerCase();

    if (irregulars[word]) {
      return irregulars[word];
    }

    if (word.length >= 2 && vowels.includes(word[word.length - 2])) {
      return word + "s";
    }

    if (
      word.endsWith("s") ||
      word.endsWith("sh") ||
      word.endsWith("ch") ||
      word.endsWith("x") ||
      word.endsWith("z")
    ) {
      return word + "es";
    }

    if (word.endsWith("y")) {
      return word.slice(0, -1) + "ies";
    }

    return word + "s";
  }

  return pluralize;
}

export const pluralize = getPluralize();
