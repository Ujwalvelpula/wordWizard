const textInput = document.getElementById("text-input");
const examplesBox = document.getElementById("examples-box");
const POS_EXAMPLES = {
  noun: ["castle", "dragon", "wizard", "wand"],
  verb: ["fly", "cast", "transform", "disappear"],
  adjective: ["magical", "sparkling", "ancient", "mysterious"],
  adverb: ["quickly", "silently", "bravely", "gracefully"]
};

function analyzeText() {
  const text = textInput.value.trim();
  const words = text === "" ? 0 : text.split(/\s+/).length;
  const characters = text.length;

  updateMetric('word-count', words);
  updateMetric('char-count', characters);

  const doc = nlp(text);
  
  updateMetric('nouns', doc.nouns().out('array').length);
  updateMetric('verbs', doc.verbs().out('array').length);
  updateMetric('adjectives', doc.adjectives().out('array').length);
  updateMetric('adverbs', doc.adverbs().out('array').length);
  
  animateIngredients();
}

function updateMetric(elementId, value) {
  const element = document.getElementById(elementId);
  element.textContent = value;
  element.classList.add('metric-pop');
  setTimeout(() => element.classList.remove('metric-pop'), 500);
}

function showExamples() {
  examplesBox.style.display = 'block';
  examplesBox.innerHTML = `<h4>Magic Words Guide:</h4>${
    Object.entries(POS_EXAMPLES).map(([pos, words]) => `
      <div class="example-group" data-pos="${pos}">
        <strong>${pos.charAt(0).toUpperCase() + pos.slice(1)}:</strong>
        ${words.map(word => `<span class="magic-word">${word}</span>`).join(', ')}
      </div>
    `).join('')
  }`;
  setTimeout(() => examplesBox.style.display = 'none', 5000);
}

function animateIngredients() {
  document.querySelectorAll('.ingredient-card').forEach(card => {
    if (Math.random() > 0.7) {
      card.style.animation = 'ingredientGlow 1s';
      setTimeout(() => card.style.animation = '', 1000);
    }
  });
}

// Initialize with sample text
textInput.value = "The quick wizard casts a sparkling spell silently...";
analyzeText();