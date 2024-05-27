const assert = require('assert');

it('has a text input', async () => {
    const dom = await render('index.html');
    const input = dom.window.document.querySelector('input');
    assert(input);
});

it('shows success message for valid input', async () => {
    const dom = await render('index.html');
    
    const input = dom.window.document.querySelector('input');
    const form = dom.window.document.querySelector('form');
    const h3 = dom.window.document.querySelector('h3');

    input.value = 'a@b.com';
    form.dispatchEvent(new dom.window.Event('submit'));

    assert.strictEqual(h3.innerHTML, 'Looks good!');
});

it('shows failure message for invalid input', async () => {
    const dom = await render('index.html');
    
    const input = dom.window.document.querySelector('input');
    const form = dom.window.document.querySelector('form');
    const h3 = dom.window.document.querySelector('h3');

    input.value = 'ab.com';
    form.dispatchEvent(new dom.window.Event('submit'));

    assert.strictEqual(h3.innerHTML, 'Invalid email!');
});