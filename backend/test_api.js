// API Test Script for Yumm! project
// Tests: Food, User, Cart, Order, AI endpoints
// Run: node test_api.js

const BASE = 'http://localhost:4000';
const AI_BASE = 'http://localhost:4040';
let TOKEN = '';
let FOOD_ID = '';
let results = [];

function log(id, name, pass, detail) {
    const status = pass ? '✅ PASS' : '❌ FAIL';
    console.log(`${status} | ${id} | ${name} | ${detail}`);
    results.push({ id, name, status, detail });
}

async function fetchJSON(url, options = {}) {
    const res = await fetch(url, options);
    const data = await res.json();
    return { status: res.status, data };
}

async function postJSON(url, body, headers = {}) {
    return fetchJSON(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...headers },
        body: JSON.stringify(body)
    });
}

// ============= FOOD API =============
async function testFood() {
    console.log('\n========== API FOOD ==========');

    // F-02: List food
    const list = await fetchJSON(`${BASE}/api/food/list`);
    log('F-02', 'Lấy danh sách sản phẩm', list.data.success && list.data.data.length > 0,
        `${list.data.data.length} items`);

    if (list.data.data.length > 0) {
        FOOD_ID = list.data.data[0]._id;
    }

    // F-03: Get food by ID
    const byId = await fetchJSON(`${BASE}/api/food/${FOOD_ID}`);
    log('F-03', 'Lấy sản phẩm theo ID', byId.data.success && byId.data.data,
        `name: ${byId.data.data?.name}`);

    // F-04: Get food by invalid ID
    const badId = await fetchJSON(`${BASE}/api/food/000000000000000000000000`);
    log('F-04', 'Lấy sản phẩm ID không tồn tại', !badId.data.data || badId.data.data === null,
        `data: ${badId.data.data}`);

    // F-05: Get food by name
    const byName = await fetchJSON(`${BASE}/api/food/get?name=Greek Salad`);
    log('F-05', 'Lấy sản phẩm theo tên', byName.data.success,
        `found: ${byName.data.data?.name}`);

    // F-06: Search food
    const search = await fetchJSON(`${BASE}/api/food/search?search=cake`);
    log('F-06', 'Tìm kiếm sản phẩm', search.data.success && search.data.data.length > 0,
        `found ${search.data.data.length} items`);

    // F-07: Search no result
    const noResult = await fetchJSON(`${BASE}/api/food/search?search=xyzabc123`);
    log('F-07', 'Tìm kiếm không kết quả', noResult.data.success && noResult.data.data.length === 0,
        `found ${noResult.data.data.length} items`);
}

// ============= USER API =============
async function testUser() {
    console.log('\n========== API USER ==========');

    const testEmail = `test_${Date.now()}@test.com`;

    // U-01: Register
    const reg = await postJSON(`${BASE}/api/user/register`, {
        name: 'Test User', email: testEmail, password: 'test12345'
    });
    log('U-01', 'Đăng ký thành công', reg.data.success && reg.data.token,
        `token: ${reg.data.token?.substring(0, 20)}...`);
    TOKEN = reg.data.token;

    // U-02: Register duplicate
    const dup = await postJSON(`${BASE}/api/user/register`, {
        name: 'Test User', email: testEmail, password: 'test12345'
    });
    log('U-02', 'Đăng ký email đã tồn tại', !dup.data.success,
        `msg: ${dup.data.message}`);

    // U-03: Register invalid email
    const badEmail = await postJSON(`${BASE}/api/user/register`, {
        name: 'Test', email: 'notanemail', password: 'test12345'
    });
    log('U-03', 'Đăng ký email không hợp lệ', !badEmail.data.success,
        `msg: ${badEmail.data.message}`);

    // U-04: Register weak password
    const weakPwd = await postJSON(`${BASE}/api/user/register`, {
        name: 'Test', email: 'weak@test.com', password: '123'
    });
    log('U-04', 'Đăng ký mật khẩu yếu', !weakPwd.data.success,
        `msg: ${weakPwd.data.message}`);

    // U-05: Login success
    const login = await postJSON(`${BASE}/api/user/login`, {
        email: testEmail, password: 'test12345'
    });
    log('U-05', 'Đăng nhập thành công', login.data.success && login.data.token,
        `name: ${login.data.name}`);
    TOKEN = login.data.token;

    // U-06: Login wrong password
    const wrongPwd = await postJSON(`${BASE}/api/user/login`, {
        email: testEmail, password: 'wrongpass'
    });
    log('U-06', 'Đăng nhập sai mật khẩu', !wrongPwd.data.success,
        `msg: ${wrongPwd.data.message}`);

    // U-07: Login user not exist
    const noUser = await postJSON(`${BASE}/api/user/login`, {
        email: 'nobody@test.com', password: 'test12345'
    });
    log('U-07', 'Đăng nhập user không tồn tại', !noUser.data.success,
        `msg: ${noUser.data.message}`);

    // U-08: Get user info
    const info = await fetchJSON(`${BASE}/api/user/get`, {
        method: 'GET', headers: { token: TOKEN }
    });
    log('U-08', 'Lấy thông tin user', info.data.success && info.data.data,
        `name: ${info.data.data?.name}`);

    // U-09: Change user info
    const change = await postJSON(`${BASE}/api/user/change`, {
        name: 'Updated User', phone: '0123456789'
    }, { token: TOKEN });
    log('U-09', 'Cập nhật thông tin user', change.data.success,
        `msg: ${change.data.message}`);

    // U-10: Access without token
    const noToken = await fetchJSON(`${BASE}/api/user/get`);
    log('U-10', 'Truy cập không có token', !noToken.data.success,
        `msg: ${noToken.data.message}`);
}

// ============= CART API =============
async function testCart() {
    console.log('\n========== API CART ==========');

    // C-01: Add to cart
    const add = await postJSON(`${BASE}/api/cart/add`, { itemId: FOOD_ID }, { token: TOKEN });
    log('C-01', 'Thêm sản phẩm vào giỏ', add.data.success,
        `msg: ${add.data.message}`);

    // C-02: Add same item again
    const add2 = await postJSON(`${BASE}/api/cart/add`, { itemId: FOOD_ID }, { token: TOKEN });
    log('C-02', 'Thêm cùng sản phẩm (tăng qty)', add2.data.success,
        `msg: ${add2.data.message}`);

    // C-04: Get cart
    const cart = await postJSON(`${BASE}/api/cart/get`, {}, { token: TOKEN });
    const qty = cart.data.cartData?.[FOOD_ID];
    log('C-04', 'Lấy giỏ hàng', cart.data.success && qty === 2,
        `qty of item: ${qty}`);

    // C-03: Remove from cart
    const remove = await postJSON(`${BASE}/api/cart/remove`, { itemId: FOOD_ID }, { token: TOKEN });
    log('C-03', 'Xóa sản phẩm khỏi giỏ', remove.data.success,
        `msg: ${remove.data.message}`);

    // Verify qty decreased
    const cart2 = await postJSON(`${BASE}/api/cart/get`, {}, { token: TOKEN });
    const qty2 = cart2.data.cartData?.[FOOD_ID];
    log('C-04b', 'Kiểm tra qty giảm sau xóa', qty2 === 1,
        `qty: ${qty2}`);

    // C-05: Get cart without token
    const noToken = await postJSON(`${BASE}/api/cart/get`, {});
    log('C-05', 'Lấy giỏ hàng không token', !noToken.data.success,
        `msg: ${noToken.data.message}`);
}

// ============= ORDER API =============
async function testOrder() {
    console.log('\n========== API ORDER ==========');

    // O-05: List all orders (admin)
    const list = await fetchJSON(`${BASE}/api/order/list`);
    log('O-05', 'Lấy tất cả đơn hàng (admin)', list.data.success,
        `${list.data.data.length} orders`);

    // O-04: User orders
    const userOrd = await postJSON(`${BASE}/api/order/userorders`, {}, { token: TOKEN });
    log('O-04', 'Lấy đơn hàng của user', userOrd.data.success,
        `${userOrd.data.data.length} orders`);
}

// ============= AI API =============
async function testAI() {
    console.log('\n========== AI MODEL ==========');

    // AI-01: Health check
    try {
        const ping = await fetchJSON(`${AI_BASE}/ping`);
        log('AI-01', 'Health check /ping', ping.data.ping === 'pong!',
            `response: ${JSON.stringify(ping.data)}`);
    } catch (e) {
        log('AI-01', 'Health check /ping', false, `Error: ${e.message}`);
    }

    // AI-02: Get recommendations
    try {
        const rec = await fetchJSON(`${AI_BASE}/recommend/?item_name=Toast&user_name=Adam`);
        log('AI-02', 'Gợi ý sản phẩm hợp lệ', rec.data.recommendations?.length > 0,
            `${rec.data.recommendations?.length} recommendations`);
    } catch (e) {
        log('AI-02', 'Gợi ý sản phẩm hợp lệ', false, `Error: ${e.message}`);
    }

    // AI-03: Invalid item
    try {
        const bad = await fetch(`${AI_BASE}/recommend/?item_name=XYZNONEXIST&user_name=Adam`);
        log('AI-03', 'Gợi ý sản phẩm không tồn tại', bad.status === 404,
            `status: ${bad.status}`);
    } catch (e) {
        log('AI-03', 'Gợi ý sản phẩm không tồn tại', false, `Error: ${e.message}`);
    }
}

// ============= RUN ALL =============
async function main() {
    console.log('🧪 BẮT ĐẦU KIỂM THỬ API - Yumm! Project');
    console.log('='.repeat(60));

    await testFood();
    await testUser();
    await testCart();
    await testOrder();
    await testAI();

    console.log('\n' + '='.repeat(60));
    const passed = results.filter(r => r.status === '✅ PASS').length;
    const failed = results.filter(r => r.status === '❌ FAIL').length;
    console.log(`\n📊 KẾT QUẢ: ${passed} PASS / ${failed} FAIL / ${results.length} TOTAL`);

    if (failed > 0) {
        console.log('\n❌ CÁC TEST THẤT BẠI:');
        results.filter(r => r.status === '❌ FAIL').forEach(r => {
            console.log(`   ${r.id}: ${r.name} — ${r.detail}`);
        });
    }
}

main().catch(console.error);
