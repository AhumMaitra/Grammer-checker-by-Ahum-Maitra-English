// script.js
document.getElementById('checkButton').addEventListener('click', async () => {
  const textInput = document.getElementById('textInput').value;
  const resultContainer = document.getElementById('resultContainer');

  resultContainer.innerHTML = 'Checking...';

  const response = await fetch('https://api.languagetool.org/v2/check', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `text=${encodeURIComponent(textInput)}&language=en-US`,
  });

  const data = await response.json();
  resultContainer.innerHTML = '';

  if (data.matches.length > 0) {
    data.matches.forEach((match) => {
      const errorElement = document.createElement('div');
      errorElement.classList.add('error');
      errorElement.innerHTML = `
        <p><strong>Error:</strong> ${match.message}</p>
        <p><strong>Context:</strong> ${match.context.text}</p>
        <p><strong>Suggestions:</strong> ${match.replacements.map(rep => rep.value).join(', ')}</p>
        <hr>
      `;
      resultContainer.appendChild(errorElement);
    });
  } else {
    resultContainer.innerHTML = '<p>No grammar issues found.</p>';
  }
});
