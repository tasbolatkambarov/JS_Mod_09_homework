// Задание 3.
// Напишите код приложения, интерфейс которого представляет собой input и кнопку. В input можно ввести любое число. При клике на кнопку происходит следующее:
// Если число не попадает в диапазон от 1 до 10 — выводить ниже текст «число вне диапазона от 1 до 10».
// Если число попадает в диапазон от 1 до 10 — сделать запрос c помощью XHR по URL https://picsum.photos/v2/list?limit=10, где get-параметр limit — это введённое число.

// Пример: если пользователь ввёл 5, то запрос будет вида https://picsum.photos/v2/list?limit=5.
// После получения данных вывести ниже картинки на экран.

// Подсказка: получение данных из input.
// const value = document.querySelector('input').value;

function useRequest(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    
    xhr.onload = function() {
      if (xhr.status != 200) {
        console.log('Статус ответа: ', xhr.status);
      } else {
        const result = JSON.parse(xhr.response);
        if (callback) {
          callback(result);
        }
      }
    };
    
    xhr.onerror = function() {
      console.log('Ошибка! Статус ответа: ', xhr.status);
    };
    
    xhr.send();
  };
  
  const resultNode = document.querySelector('.output');
  
  const btnNode = document.querySelector('.button');
  
  function displayResult(apiData) {
    let cards = '';
    
    apiData.forEach(item => {
      const cardBlock = `
        <div class="card">
          <img
            src="${item.download_url}"
            class="card-image"
          />
        </div>
      `;
      cards = cards + cardBlock;
    });
      
    resultNode.innerHTML = cards;
  }
  
  const inputValue = document.querySelector('.input');
  
  btnNode.addEventListener('click', () => {
    const value = +inputValue.value;
    if (Number.isInteger(value)) {
      if (value < 1 || value > 10){
        resultNode.innerHTML = "<p>Число вне диапазона от 1 до 10.</p>";
      } else {
        useRequest(`https://picsum.photos/v2/list/?limit=${value}`, displayResult);
      }
    } else {
      resultNode.innerHTML = "<p>Введено не целое число.</p>";
    }
  })