// 平滑滚动效果
function smoothScroll() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 点击Hello Kitty回到首页的彩蛋功能
function helloKittyEasterEgg() {
    const helloKitty = document.getElementById('backToTop');
    
    if (helloKitty) {
        helloKitty.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // 添加点击特效
            this.style.transform = 'scale(1.5)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 300);
            
            // 显示提示消息
            showNotification('🐱 回到首页啦！');
        });
    }
}

// 显示提示消息
function showNotification(message) {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #ff69b4;
        color: white;
        padding: 15px 30px;
        border-radius: 25px;
        font-size: 18px;
        font-weight: bold;
        box-shadow: 0 10px 30px rgba(255, 105, 180, 0.5);
        z-index: 10000;
        animation: slideIn 0.5s ease, fadeOut 0.5s ease 2s forwards;
    `;
    
    // 添加动画
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translate(-50%, -50%) scale(0); opacity: 0; }
            to { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        }
    `;
    document.head.appendChild(style);
    
    // 添加到页面
    document.body.appendChild(notification);
    
    // 3秒后移除
    setTimeout(() => {
        notification.remove();
        style.remove();
    }, 3000);
}

// 表单提交处理
function handleFormSubmit() {
    const messageForm = document.querySelector('.message-form');
    
    if (messageForm) {
        messageForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = new FormData(this);
            const name = formData.get('name');
            const gender = formData.get('gender');
            const phone = formData.get('phone');
            const email = formData.get('email');
            const content = formData.get('content');
            
            // 简单验证
            if (!name || !gender || !phone || !email || !content) {
                showNotification('⚠️ 请填写完整的留言信息！');
                return;
            }
            
            // 模拟提交成功
            showNotification('🎉 留言提交成功！感谢您的留言～');
            
            // 重置表单
            this.reset();
        });
    }
}

// 导航栏滚动效果
function navbarScrollEffect() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.backgroundColor = 'rgba(255, 182, 193, 0.98)';
            navbar.style.boxShadow = '0 5px 20px rgba(255, 105, 180, 0.4)';
        } else {
            navbar.style.backgroundColor = 'rgba(255, 182, 193, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(255, 105, 180, 0.3)';
        }
    });
}

// 页面加载完成后执行所有功能
document.addEventListener('DOMContentLoaded', function() {
    smoothScroll();
    helloKittyEasterEgg();
    handleFormSubmit();
    navbarScrollEffect();
    
    // 页面加载完成提示
    setTimeout(() => {
        showNotification('🐱 欢迎来到柳喜悦的Hello Kitty博客！');
    }, 1000);
});