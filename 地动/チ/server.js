const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2'
};

const server = http.createServer((req, res) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);

    // 解析 URL
    const parsedUrl = url.parse(req.url);
    let pathname = path.join(__dirname, 'dist', parsedUrl.pathname);

    // 默认文件
    if (parsedUrl.pathname === '/') {
        pathname = path.join(__dirname, 'dist', 'index.html');
    }

    // 获取文件扩展名
    const ext = path.extname(pathname);

    // 检查文件是否存在
    fs.exists(pathname, (exists) => {
        if (!exists) {
            // 如果文件不存在，返回 index.html（支持 SPA 路由）
            fs.readFile(path.join(__dirname, 'dist', 'index.html'), (err, data) => {
                if (err) {
                    res.writeHead(404);
                    res.end('File not found');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(data);
                }
            });
            return;
        }

        // 如果是目录，查找 index.html
        if (fs.statSync(pathname).isDirectory()) {
            pathname = path.join(pathname, 'index.html');
        }

        // 读取文件
        fs.readFile(pathname, (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end(`Error: ${err.code}`);
            } else {
                // 设置 Content-Type
                const contentType = mimeTypes[ext] || 'text/plain';
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(data);
            }
        });
    });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log('=================================');
    console.log('服务器启动成功！');
    console.log(`访问地址: http://localhost:${PORT}`);
    console.log(`服务目录: ${path.join(__dirname, 'dist')}`);
    console.log('=================================');
});

process.on('SIGINT', () => {
    console.log('\n正在关闭服务器...');
    server.close(() => {
        console.log('服务器已关闭');
        process.exit(0);
    });
});