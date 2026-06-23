// DOM 元素
const urlInput = document.getElementById('urlInput');
const shortenBtn = document.getElementById('shortenBtn');
const resultSection = document.getElementById('resultSection');
const originalUrlElement = document.getElementById('originalUrl');
const shortenedUrlElement = document.getElementById('shortenedUrl');
const shortCodeElement = document.getElementById('shortCode');
const copyBtn = document.getElementById('copyBtn');
const copyCodeBtn = document.getElementById('copyCodeBtn');
const historyList = document.getElementById('historyList');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');
const toast = document.getElementById('toast');
const qrCodeContainer = document.getElementById('qrCode');
const downloadQrBtn = document.getElementById('downloadQrBtn');

// 存储空间前缀
const STORAGE_KEY = 'urlShortenerHistory';
const BASE_URL = 'https://short.url/';

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    loadHistory();
    setupEventListeners();
});

function setupEventListeners() {
    shortenBtn.addEventListener('click', shortenURL);
    urlInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            shortenURL();
        }
    });
    copyBtn.addEventListener('click', () => copyToClipboard(shortenedUrlElement.textContent, '短链接'));
    copyCodeBtn.addEventListener('click', () => copyToClipboard(shortCodeElement.textContent, '短链接码'));
    clearHistoryBtn.addEventListener('click', clearHistory);
    downloadQrBtn.addEventListener('click', downloadQRCode);
}

// 生成短码
function generateShortCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

// 验证 URL
function isValidURL(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

// 生成 QR 码
function generateQRCode(url) {
    qrCodeContainer.innerHTML = '';
    new QRCode(qrCodeContainer, {
        text: url,
        width: 200,
        height: 200,
        colorDark: '#667eea',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
    });
}

// 下载 QR 码
function downloadQRCode() {
    const canvas = qrCodeContainer.querySelector('canvas');
    if (!canvas) {
        showToast('QR 码还未生成', 'error');
        return;
    }
    
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `qrcode-${shortCodeElement.textContent}.png`;
    link.click();
    
    showToast('QR 码已下载', 'success');
}

// 缩短 URL
function shortenURL() {
    const url = urlInput.value.trim();

    // 验证输入
    if (!url) {
        showToast('请输入 URL', 'error');
        return;
    }

    if (!isValidURL(url)) {
        showToast('请输入有效的 URL（如：https://example.com）', 'error');
        return;
    }

    // 生成短码
    const shortCode = generateShortCode();
    const shortenedURL = BASE_URL + shortCode;

    // 显示结果
    originalUrlElement.textContent = url;
    shortenedUrlElement.textContent = shortenedURL;
    shortCodeElement.textContent = shortCode;
    resultSection.classList.remove('hidden');

    // 生成 QR 码（新增功能）
    generateQRCode(shortenedURL);

    // 保存到历史
    saveToHistory(url, shortCode, shortenedURL);

    // 清空输入框
    urlInput.value = '';
    urlInput.focus();

    showToast('URL 缩短成功！', 'success');
}

// 复制到剪贴板
function copyToClipboard(text, name) {
    navigator.clipboard.writeText(text).then(() => {
        showToast(`已复制 ${name} 到剪贴板`, 'success');
    }).catch(() => {
        showToast('复制失败，请重试', 'error');
    });
}

// 保存到历史
function saveToHistory(originalUrl, shortCode, shortenedUrl) {
    let history = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    const item = {
        id: Date.now(),
        originalUrl,
        shortCode,
        shortenedUrl,
        timestamp: new Date().toLocaleString('zh-CN')
    };

    // 检查是否已存在相同的 URL
    const existingIndex = history.findIndex(h => h.originalUrl === originalUrl);
    if (existingIndex !== -1) {
        history.splice(existingIndex, 1);
    }

    // 添加到最前面
    history.unshift(item);

    // 只保留最近 20 条
    history = history.slice(0, 20);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    loadHistory();
}

// 加载历史
function loadHistory() {
    const history = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    if (history.length === 0) {
        historyList.innerHTML = '<p class="empty-message">还没有缩短过 URL，开始使用吧！</p>';
        clearHistoryBtn.classList.add('hidden');
        return;
    }

    clearHistoryBtn.classList.remove('hidden');
    historyList.innerHTML = history.map(item => `
        <div class="history-item">
            <div class="history-item-content">
                <div class="history-original">原始: ${escapeHtml(item.originalUrl)}</div>
                <div class="history-short">${item.shortenedUrl}</div>
            </div>
            <div class="history-time">${item.timestamp}</div>
            <button class="btn btn-copy" onclick="copyToClipboard('${item.shortenedUrl}', '短链接')">📋</button>
        </div>
    `).join('');
}

// 清空历史
function clearHistory() {
    if (confirm('确定要清空所有历史记录吗？')) {
        localStorage.removeItem(STORAGE_KEY);
        loadHistory();
        resultSection.classList.add('hidden');
        showToast('历史记录已清空', 'success');
    }
}

// 显示提示
function showToast(message, type = 'success') {
    toast.textContent = message;
    toast.className = `toast show ${type}`;
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// HTML 转义（防止 XSS）
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}