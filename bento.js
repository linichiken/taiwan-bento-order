document.getElementById('orderForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const data = new FormData(e.target);
  const name = data.get('name').trim();
  const bento = data.get('bento');
  const quantity = data.get('quantity');

  const message = document.getElementById('formMessage');
  message.textContent = `謝謝 ${name}！您的「${bento}」x${quantity} 已送出，我們將盡快致電確認送餐時間。`;

  e.target.reset();
});
