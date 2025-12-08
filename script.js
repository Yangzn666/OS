// 平滑滚动到章节
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// 为所有 details 元素添加切换动画
// 番茄ToDo风格的流畅展开/收起动画
document.querySelectorAll('details').forEach(detail => {
    detail.addEventListener('toggle', function() {
        const content = this.querySelector('div');
        if (this.open) {
            // 展开时添加动画
            if (content) {
                content.style.display = 'block';
                content.style.opacity = '0';
                content.style.maxHeight = '0';
                content.style.overflow = 'hidden';
                content.style.transform = 'translateY(-15px)';
                content.style.transition = 'opacity 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), maxHeight 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)';
                
                // 获取内容的实际高度
                const height = content.scrollHeight;
                
                // 强制重绘后触发动画
                setTimeout(() => {
                    content.style.opacity = '1';
                    content.style.transform = 'translateY(0)';
                    content.style.maxHeight = height + 'px';
                }, 10);
                
                // 动画结束后移除maxHeight限制
                setTimeout(() => {
                    content.style.maxHeight = 'none';
                }, 400);
            }
        } else {
            // 关闭时的动画
            if (content) {
                const height = content.scrollHeight;
                content.style.maxHeight = height + 'px';
                
                // 强制重绘
                setTimeout(() => {
                    content.style.opacity = '0';
                    content.style.transform = 'translateY(-15px)';
                    content.style.maxHeight = '0';
                }, 10);
            }
        }
    });
});

// 添加章节标题的视差效果
window.addEventListener('scroll', function() {
    const chapters = document.querySelectorAll('.chapter');
    const scrollPosition = window.scrollY;
    
    chapters.forEach(chapter => {
        const chapterTop = chapter.offsetTop;
        const chapterHeight = chapter.offsetHeight;
        const windowHeight = window.innerHeight;
        
        if (scrollPosition > chapterTop - windowHeight + 100 && 
            scrollPosition < chapterTop + chapterHeight) {
            // 可以在这里添加激活状态的样式
            // 暂时留空，可以根据需要添加高亮效果
        }
    });
});

// 移动端菜单切换功能
function toggleMobileMenu() {
    const nav = document.querySelector('nav ul');
    nav.classList.toggle('mobile-menu-open');
    
    // 添加旋转动画到菜单按钮
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.classList.toggle('active');
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('操作系统学习网站已加载完成');
    
    // 检查是否在移动端，如果是，则为导航添加触摸支持
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // 为所有可点击元素添加触摸反馈
        const clickableElements = document.querySelectorAll('a, button, summary');
        clickableElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            });
            
            element.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('touch-active');
                }, 150);
            });
        });
        
        // 为移动端添加特殊处理
        handleMobileOptimizations();
    }
    
    // 添加番茄ToDo风格的悬停效果
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 12px 30px rgba(0,0,0,0.12)';
        });
        
        section.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 20px rgba(0,0,0,0.08)';
        });
    });
    
    // 为导航链接添加悬停效果
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 6px 12px rgba(0,0,0,0.12)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
        
        // 添加番茄ToDo风格的点击波纹效果
        link.addEventListener('click', function(e) {
            createRippleEffect(e, this);
        });
    });
    
    // 为按钮添加波纹效果
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            createRippleEffect(e, this);
        });
    });
    
    // 为搜索结果项添加点击事件
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('search-result-item')) {
            const url = e.target.getAttribute('data-url');
            const targetId = e.target.getAttribute('data-target');
            
            if (url && targetId) {
                // 在新窗口中打开目标页面
                const newWindow = window.open(url, '_blank');
                // 注意：由于跨域限制，我们无法直接在新窗口中展开特定元素
                // 用户需要在新页面中手动找到相关内容
            }
        }
    });
    
    // 为搜索框添加回车键监听
    const searchInput = document.getElementById('knowledgeSearch');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchKnowledge();
            }
        });
    }
});

// 创建番茄ToDo风格的波纹效果
function createRippleEffect(e, element) {
    // 移除之前存在的波纹
    const existingRipple = element.querySelector('.ripple');
    if (existingRipple) {
        existingRipple.remove();
    }
    
    // 创建新的波纹元素
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    
    // 设置波纹位置
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    element.appendChild(ripple);
    
    // 波纹动画结束后移除
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// 窗口大小改变时的处理
window.addEventListener('resize', function() {
    // 如果有打开的移动端菜单，在屏幕变大时关闭它
    if (window.innerWidth > 768) {
        const nav = document.querySelector('nav ul');
        if (nav) {
            nav.classList.remove('mobile-menu-open');
        }
        
        // 移除菜单按钮的激活状态
        const menuToggle = document.querySelector('.menu-toggle');
        if (menuToggle) {
            menuToggle.classList.remove('active');
        }
    }
});

// 添加番茄ToDo风格的加载动画
window.addEventListener('load', function() {
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        // 添加延迟显示效果，番茄ToDo风格的流畅动画
        setTimeout(() => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.6s cubic-bezier(0.25, 0.8, 0.25, 1), transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
            
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        }, index * 150);
    });
});

// 回到顶部按钮功能和进度条
window.addEventListener('scroll', function() {
    // 回到顶部按钮
    const backToTopButton = document.getElementById('backToTop');
    if (backToTopButton) {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    }
    
    // 页面进度条
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        const scrollTop = window.scrollY;
        const docHeight = document.body.clientHeight;
        const winHeight = window.innerHeight;
        const scrollPercent = scrollTop / (docHeight - winHeight);
        const scrollPercentRounded = Math.round(scrollPercent * 100);
        progressBar.style.width = scrollPercentRounded + '%';
    }
});

// 回到顶部按钮功能
document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.getElementById('backToTop');
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

// 学习提示切换功能
function toggleStudyTip(tipId) {
    const tipElement = document.getElementById(tipId);
    if (tipElement) {
        if (tipElement.style.display === 'none') {
            tipElement.style.display = 'block';
        } else {
            tipElement.style.display = 'none';
        }
    }
}

// 知识点搜索功能
function searchKnowledge() {
    const searchTerm = document.getElementById('knowledgeSearch').value.trim().toLowerCase();
    const searchResults = document.getElementById('searchResults');
    
    if (!searchTerm) {
        searchResults.innerHTML = '<p>请输入要搜索的关键字</p>';
        return;
    }
    
    // 定义知识点数据库
    const knowledgeBase = [
        // 第1章
        { title: "操作系统的基本概念", chapter: "第1章 计算机系统概述", url: "chapter1.html", keywords: ["操作系统", "概念", "基本概念"] },
        { title: "操作系统的特征", chapter: "第1章 计算机系统概述", url: "chapter1.html", keywords: ["并发", "共享", "虚拟", "异步"] },
        { title: "操作系统的发展历程", chapter: "第1章 计算机系统概述", url: "chapter1.html", keywords: ["手工操作", "批处理", "分时系统", "实时系统"] },
        { title: "处理器运行模式", chapter: "第1章 计算机系统概述", url: "chapter1.html", keywords: ["用户态", "内核态", "cpu模式"] },
        { title: "中断和异常", chapter: "第1章 计算机系统概述", url: "chapter1.html", keywords: ["中断", "异常", "内外中断"] },
        { title: "系统调用", chapter: "第1章 计算机系统概述", url: "chapter1.html", keywords: ["系统调用", "syscall"] },
        
        // 第2章
        { title: "进程的基本概念", chapter: "第2章 进程管理", url: "chapter2.html", keywords: ["进程", "概念", "进程概念"] },
        { title: "进程的状态", chapter: "第2章 进程管理", url: "chapter2.html", keywords: ["进程状态", "运行态", "就绪态", "阻塞态"] },
        { title: "进程控制块(PCB)", chapter: "第2章 进程管理", url: "chapter2.html", keywords: ["进程控制块", "pcb"] },
        { title: "进程控制", chapter: "第2章 进程管理", url: "chapter2.html", keywords: ["进程控制", "创建", "终止", "阻塞"] },
        { title: "进程同步", chapter: "第2章 进程管理", url: "chapter2.html", keywords: ["进程同步", "临界区", "互斥"] },
        { title: "信号量机制", chapter: "第2章 进程管理", url: "chapter2.html", keywords: ["信号量", "pv操作", "semaphore"] },
        { title: "经典同步问题", chapter: "第2章 进程管理", url: "chapter2.html", keywords: ["生产者消费者", "哲学家进餐", "读者写者"] },
        { title: "死锁", chapter: "第2章 进程管理", url: "chapter2.html", keywords: ["死锁", "银行家算法"] },
        { title: "进程调度", chapter: "第2章 进程管理", url: "chapter2.html", keywords: ["进程调度", "调度算法"] },
        
        // 第3章
        { title: "内存管理基础", chapter: "第3章 内存管理", url: "chapter3.html", keywords: ["内存管理", "地址转换"] },
        { title: "连续分配方式", chapter: "第3章 内存管理", url: "chapter3.html", keywords: ["连续分配", "单一连续分配", "固定分区分配", "动态分区分配"] },
        { title: "分页存储管理", chapter: "第3章 内存管理", url: "chapter3.html", keywords: ["分页", "页表", "快表"] },
        { title: "分段存储管理", chapter: "第3章 内存管理", url: "chapter3.html", keywords: ["分段", "段表"] },
        { title: "段页式存储管理", chapter: "第3章 内存管理", url: "chapter3.html", keywords: ["段页式", "段页结合"] },
        { title: "虚拟内存", chapter: "第3章 内存管理", url: "chapter3.html", keywords: ["虚拟内存", "请求分页", "页面置换"] },
        { title: "页面置换算法", chapter: "第3章 内存管理", url: "chapter3.html", keywords: ["fifo", "lru", "opt", "clock"] },
        
        // 第4章
        { title: "文件系统概述", chapter: "第4章 文件管理", url: "chapter4.html", keywords: ["文件", "文件系统"] },
        { title: "文件的逻辑结构", chapter: "第4章 文件管理", url: "chapter4.html", keywords: ["逻辑结构", "顺序文件", "索引文件"] },
        { title: "文件的物理结构", chapter: "第4章 文件管理", url: "chapter4.html", keywords: ["物理结构", "连续分配", "链接分配", "索引分配"] },
        { title: "目录管理", chapter: "第4章 文件管理", url: "chapter4.html", keywords: ["目录", "目录结构", "树形目录"] },
        { title: "文件共享与保护", chapter: "第4章 文件管理", url: "chapter4.html", keywords: ["文件共享", "文件保护"] },
        { title: "磁盘存储管理", chapter: "第4章 文件管理", url: "chapter4.html", keywords: ["磁盘", "磁盘调度"] },
        
        // 第5章
        { title: "I/O系统基础", chapter: "第5章 设备管理", url: "chapter5.html", keywords: ["io系统", "io设备"] },
        { title: "I/O软件层次结构", chapter: "第5章 设备管理", url: "chapter5.html", keywords: ["io软件", "中断处理程序", "设备驱动程序"] },
        { title: "缓冲技术", chapter: "第5章 设备管理", url: "chapter5.html", keywords: ["缓冲", "单缓冲", "双缓冲"] },
        { title: "设备分配", chapter: "第5章 设备管理", url: "chapter5.html", keywords: ["设备分配", "spooling"] },
        { title: "磁盘管理", chapter: "第5章 设备管理", url: "chapter5.html", keywords: ["磁盘调度", "raid"] }
    ];
    
    // 搜索匹配的知识点
    const results = knowledgeBase.filter(item => {
        // 检查标题是否匹配
        if (item.title.toLowerCase().includes(searchTerm)) {
            return true;
        }
        
        // 检查关键词是否匹配
        return item.keywords.some(keyword => keyword.includes(searchTerm));
    });
    
    // 显示搜索结果
    if (results.length > 0) {
        let resultsHtml = `<p>找到 ${results.length} 个相关知识点：</p>`;
        results.forEach(result => {
            resultsHtml += `
                <div class="search-result-item" data-url="${result.url}">
                    <div class="search-result-title">${result.title}</div>
                    <div class="search-result-path">位于：${result.chapter}</div>
                </div>
            `;
        });
        searchResults.innerHTML = resultsHtml;
    } else {
        searchResults.innerHTML = '<p>未找到相关知识点，请尝试其他关键字</p>';
    }
}

// 移动端优化处理函数
function handleMobileOptimizations() {
    // 为details元素添加特殊处理，使其在移动端更容易点击
    const detailsElements = document.querySelectorAll('details summary');
    detailsElements.forEach(summary => {
        // 添加更大的点击区域
        summary.style.position = 'relative';
        summary.style.padding = '15px';
        
        // 添加触摸友好的视觉反馈
        summary.addEventListener('touchstart', function() {
            this.style.backgroundColor = 'rgba(102, 126, 234, 0.1)';
        });
        
        summary.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.backgroundColor = '';
            }, 150);
        });
    });
    
    // 优化搜索结果项的触摸体验
    const searchItems = document.querySelectorAll('.search-result-item');
    searchItems.forEach(item => {
        item.style.padding = '15px';
        item.style.marginBottom = '10px';
        
        // 添加触摸反馈
        item.addEventListener('touchstart', function() {
            this.style.backgroundColor = 'rgba(102, 126, 234, 0.2)';
            this.style.transform = 'translateX(5px)';
        });
        
        item.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.backgroundColor = '';
                this.style.transform = '';
            }, 150);
        });
    });
    
    // 优化按钮的触摸体验
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        // 增大按钮的触摸区域
        button.style.minHeight = '44px'; // 符合移动端最佳实践
        button.style.minWidth = '44px';
        
        // 添加触摸反馈
        button.addEventListener('touchstart', function() {
            this.style.opacity = '0.8';
        });
        
        button.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.opacity = '';
            }, 150);
        });
    });
    
    // 为学习提示按钮添加移动端优化
    const studyTipButtons = document.querySelectorAll('.study-tip-btn');
    studyTipButtons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.opacity = '0.8';
        });
        
        button.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.opacity = '';
            }, 150);
        });
    });
}