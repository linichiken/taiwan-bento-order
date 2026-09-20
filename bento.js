const SUPABASE_URL = 'https://ojbbbrwcklokawxqovnh.supabase.co';
const SUPABASE_KEY = 'sb_publishable_dZYUW-NCQiyqZkSwp0B28g_Q0Hi7hY3';

const form = document.getElementById('orderForm');
const message = document.getElementById('formMessage');
const submitBtn = form.querySelector('button[type="submit"]');

if (!window.supabase) {
  message.style.color = '#c0392b';
  message.textContent = '系統尚未準備完成，請重新整理頁面後再試。';
} else {
  const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const data = new FormData(form);
    const order = {
      name: data.get('name').trim(),
      phone: data.get('phone').trim(),
      address: data.get('address').trim(),
      bento: data.get('bento'),
      quantity: Number(data.get('quantity')),
      note: data.get('note').trim() || null,
    };

    submitBtn.disabled = true;
    message.style.color = '';
    message.textContent = '訂單送出中，請稍候...';

    const { error } = await supabaseClient.from('bento_orders').insert(order);

    submitBtn.disabled = false;

    if (error) {
      message.style.color = '#c0392b';
      message.textContent = '抱歉，訂單送出失敗，請稍後再試。';
      console.error(error);
      return;
    }

    message.style.color = '';
    message.textContent = `謝謝 ${order.name}！您的「${order.bento}」x${order.quantity} 已送出，我們將盡快致電確認送餐時間。`;
    form.reset();
  });
}
