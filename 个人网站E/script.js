// 平滑滚动功能
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// 返回顶部功能
window.scrollToTop = function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

// 导航栏链接平滑滚动
document.addEventListener('DOMContentLoaded', function() {
    const navbarLinks = document.querySelectorAll('.navbar-link');
    
    navbarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            smoothScroll(targetId);
        });
    });
    
    // 返回顶部按钮显示/隐藏逻辑
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // 页面加载时的动画效果
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 观察所有页面元素
    const pageElements = document.querySelectorAll('.container, .avatar, .name, .school, .major, .resume');
    pageElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(element);
    });
    
    // 添加页面切换动画
    let currentPage = 1;
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        // 检测当前页面
        for (let i = 1; i <= 5; i++) {
            const page = document.getElementById(`page${i}`);
            if (page) {
                const pageTop = page.offsetTop;
                const pageHeight = page.offsetHeight;
                
                if (scrollPosition >= pageTop - windowHeight / 2 && scrollPosition < pageTop + pageHeight - windowHeight / 2) {
                    currentPage = i;
                    break;
                }
            }
        }
        
        // 为当前页面添加激活状态
        navbarLinks.forEach(link => {
            link.classList.remove('active');
            const linkPage = link.getAttribute('href').replace('#page', '');
            if (parseInt(linkPage) === currentPage) {
                link.classList.add('active');
            }
        });
    });
    
    // 鼠标移动效果 - 添加Hello Kitty粒子效果
    const body = document.body;
    let particles = [];
    
    body.addEventListener('mousemove', function(e) {
        if (Math.random() > 0.95) { // 控制粒子生成频率
            createParticle(e.clientX, e.clientY);
        }
    });
    
    function createParticle(x, y) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = '20px';
        particle.style.height = '20px';
        particle.style.backgroundImage = 'url(https://cdn.pixabay.com/photo/2023/06/20/18/27/kitty-8072142_1280.png)';
        particle.style.backgroundSize = 'contain';
        particle.style.backgroundRepeat = 'no-repeat';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        particle.style.opacity = '0.7';
        particle.style.transform = 'translate(-50%, -50%) scale(0)';
        particle.style.transition = 'all 1s ease-out';
        
        body.appendChild(particle);
        particles.push(particle);
        
        // 动画效果
        setTimeout(() => {
            particle.style.transform = 'translate(-50%, -50%) scale(1) translateY(-30px)';
            particle.style.opacity = '0';
        }, 10);
        
        // 移除粒子
        setTimeout(() => {
            particle.remove();
            particles = particles.filter(p => p !== particle);
        }, 1000);
    }
});

// 添加键盘导航功能
document.addEventListener('keydown', function(e) {
    const currentPage = document.querySelector('.page.active') || document.getElementById('page1');
    const currentPageId = parseInt(currentPage.id.replace('page', ''));
    
    switch(e.key) {
        case 'ArrowUp':
            if (currentPageId > 1) {
                smoothScroll(`#page${currentPageId - 1}`);
            }
            break;
        case 'ArrowDown':
            if (currentPageId < 5) {
                smoothScroll(`#page${currentPageId + 1}`);
            }
            break;
        case 'Home':
            scrollToTop();
            break;
        case 'End':
            smoothScroll('#page5');
            break;
    }
});