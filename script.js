// Portfolio Terminal Interface
class PortfolioTerminal {
    constructor() {
        this.currentSection = 'home';
        this.commandHistory = [];
        this.historyIndex = -1;
        this.isTerminalActive = false;
        
        this.commands = {
            'help': this.showHelp.bind(this),
            'ls': this.listSections.bind(this),
            'cd': this.changeSection.bind(this),
            'pwd': this.showCurrentSection.bind(this),
            'clear': this.clearTerminal.bind(this),
            'whoami': this.showWhoAmI.bind(this),
            'cat': this.showSectionInfo.bind(this),
            'tree': this.showSiteStructure.bind(this),
            'history': this.showHistory.bind(this),
            'contact': this.showContactInfo.bind(this),
            'skills': this.showSkills.bind(this),
            'projects': this.showProjects.bind(this),
            'exit': this.closeTerminal.bind(this),
            'about': this.showAbout.bind(this)
        };
        
        this.sections = {
            'home': 'Personal introduction and overview',
            'education': 'Academic background and qualifications',
            'skills': 'Technical skills and expertise',
            'experience': 'Professional work experience',
            'projects': 'Portfolio of completed projects',
            'research': 'Research papers and academic contributions',
            'contact': 'Contact information and social links'
        };
        
        this.init();
    }
    
    init() {
        console.log('Initializing Portfolio Terminal...');
        this.bindEvents();
        this.addWelcomeMessage();
        this.setupInstructionOverlay();
        this.setupIntersectionObserver();
        this.setupMouseTracking();
    }
    
    setupInstructionOverlay() {
        const overlay = document.getElementById('instruction-overlay');
        const closeBtn = document.getElementById('close-instructions');
        
        if (overlay && closeBtn) {
            // Auto-hide after 10 seconds
            setTimeout(() => {
                overlay.style.opacity = '0';
                setTimeout(() => {
                    overlay.style.display = 'none';
                }, 500);
            }, 10000);
            
            // Close on button click
            closeBtn.addEventListener('click', () => {
                overlay.style.opacity = '0';
                setTimeout(() => {
                    overlay.style.display = 'none';
                }, 500);
            });
        }
    }
    
    setupMouseTracking() {
        document.addEventListener('mousemove', (e) => {
            const sections = document.querySelectorAll('.section');
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                section.style.setProperty('--mouse-x', `${x}%`);
                section.style.setProperty('--mouse-y', `${y}%`);
            });
        });
    }
    
    bindEvents() {
        const terminalToggle = document.getElementById('terminal-toggle');
        const terminalClose = document.getElementById('terminal-close');
        const terminalInput = document.getElementById('terminal-input');
        const navItems = document.querySelectorAll('.nav-item');
        
        if (terminalToggle) {
            terminalToggle.addEventListener('click', () => this.toggleTerminal());
        }
        
        if (terminalClose) {
            terminalClose.addEventListener('click', () => this.closeTerminal());
        }
        
        if (terminalInput) {
            terminalInput.addEventListener('keydown', (e) => this.handleKeydown(e));
        }
        
        // Navigation menu events
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const section = item.getAttribute('data-section');
                this.navigateToSection(section);
            });
        });
        
        // Escape key to close terminal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isTerminalActive) {
                this.closeTerminal();
            }
        });
    }
    
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const section = entry.target;
                    const sectionId = section.id;
                    
                    // Trigger animations based on section
                    this.triggerSectionAnimations(sectionId);
                }
            });
        }, observerOptions);

        // Observe all sections
        document.querySelectorAll('.section').forEach(section => {
            observer.observe(section);
        });
    }

    triggerSectionAnimations(sectionId) {
        switch(sectionId) {
            case 'education':
                this.animateEducationSection();
                break;
            case 'skills':
                this.animateSkillsSection();
                break;
            case 'projects':
                this.animateProjectsSection();
                break;
            case 'experience':
                this.animateExperienceSection();
                break;
            case 'research':
                this.animateResearchSection();
                break;
            case 'contact':
                this.animateContactSection();
                break;
        }
    }

    animateEducationSection() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('animate');
            }, index * 200);
        });
    }

    animateSkillsSection() {
        const skillCategories = document.querySelectorAll('.skill-category');
        skillCategories.forEach((category, index) => {
            setTimeout(() => {
                category.classList.add('animate');
                
                // Animate skill items within each category
                const skillItems = category.querySelectorAll('.skill-item');
                skillItems.forEach((item, itemIndex) => {
                    setTimeout(() => {
                        item.classList.add('animate');
                        
                        // Animate skill progress bars
                        const progressBar = item.querySelector('.skill-progress');
                        if (progressBar) {
                            const progress = progressBar.style.getPropertyValue('--progress');
                            progressBar.style.width = progress;
                        }
                    }, itemIndex * 100);
                });
            }, index * 200);
        });
    }

    animateProjectsSection() {
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animate');
            }, index * 200);
        });
    }

    animateExperienceSection() {
        const experienceCards = document.querySelectorAll('.experience-card');
        experienceCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animate');
            }, index * 300);
        });
    }

    animateResearchSection() {
        const paperCards = document.querySelectorAll('.paper-card');
        paperCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animate');
            }, index * 200);
        });
    }

    animateContactSection() {
        const contactInfo = document.querySelector('.contact-info');
        const contactForm = document.querySelector('.contact-form-container');
        
        if (contactInfo) {
            contactInfo.classList.add('animate');
            
            // Animate info items
            const infoItems = contactInfo.querySelectorAll('.info-item');
            infoItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('animate');
                }, index * 100);
            });
        }
        
        if (contactForm) {
            setTimeout(() => {
                contactForm.classList.add('animate');
            }, 300);
        }
    }
    
    toggleTerminal() {
        const terminal = document.getElementById('terminal-container');
        const mainContainer = document.getElementById('main-container');
        
        if (this.isTerminalActive) {
            this.closeTerminal();
        } else {
            this.openTerminal();
        }
    }
    
    openTerminal() {
        const terminal = document.getElementById('terminal-container');
        const mainContainer = document.getElementById('main-container');
        const terminalInput = document.getElementById('terminal-input');
        
        terminal.style.display = 'block';
        setTimeout(() => {
            terminal.style.opacity = '1';
            terminal.style.transform = 'translate(-50%, -50%) scale(1)';
            mainContainer.classList.add('terminal-active');
        }, 10);
        
        this.isTerminalActive = true;
        
        setTimeout(() => {
            if (terminalInput) {
                terminalInput.focus();
            }
        }, 300);
    }
    
    closeTerminal() {
        const terminal = document.getElementById('terminal-container');
        const mainContainer = document.getElementById('main-container');
        
        terminal.style.opacity = '0';
        terminal.style.transform = 'translate(-50%, -50%) scale(0.9)';
        mainContainer.classList.remove('terminal-active');
        
        setTimeout(() => {
            terminal.style.display = 'none';
        }, 300);
        
        this.isTerminalActive = false;
    }
    
    handleKeydown(e) {
        const input = e.target;
        
        if (e.key === 'Enter') {
            e.preventDefault();
            const command = input.value.trim();
            if (command) {
                this.executeCommand(command);
                this.commandHistory.push(command);
                this.historyIndex = this.commandHistory.length;
            }
            input.value = '';
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (this.historyIndex > 0) {
                this.historyIndex--;
                input.value = this.commandHistory[this.historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (this.historyIndex < this.commandHistory.length - 1) {
                this.historyIndex++;
                input.value = this.commandHistory[this.historyIndex];
            } else {
                this.historyIndex = this.commandHistory.length;
                input.value = '';
            }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            this.autoComplete(input);
        }
    }
    
    executeCommand(commandLine) {
        const output = document.getElementById('terminal-output');
        
        // Add command to output
        const commandElement = document.createElement('div');
        commandElement.innerHTML = `<span class="terminal-prompt">portfolio@terminal:~$</span> ${commandLine}`;
        output.appendChild(commandElement);
        
        // Parse command
        const parts = commandLine.split(' ');
        const command = parts[0].toLowerCase();
        const args = parts.slice(1);
        
        // Execute command
        if (this.commands[command]) {
            this.commands[command](args);
        } else {
            this.addOutput(`Command not found: ${command}. Type 'help' for available commands.`, 'error');
        }
        
        // Scroll to bottom
        output.scrollTop = output.scrollHeight;
    }
    
    addOutput(text, type = 'normal') {
        const output = document.getElementById('terminal-output');
        const element = document.createElement('div');
        element.className = `terminal-line ${type}`;
        element.innerHTML = text;
        output.appendChild(element);
        output.scrollTop = output.scrollHeight;
    }
    
    navigateToSection(sectionName) {
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Show target section
        const targetSection = document.getElementById(sectionName);
        if (targetSection) {
            targetSection.classList.add('active');
            this.currentSection = sectionName;
            
            // Update navigation
            this.updateNavigation(sectionName);
            
            // Trigger animations for the section
            setTimeout(() => {
                this.triggerSectionAnimations(sectionName);
            }, 100);
        }
    }
    
    updateNavigation(activeSection) {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-section') === activeSection) {
                item.classList.add('active');
            }
        });
    }
    
    autoComplete(input) {
        const value = input.value;
        const commands = Object.keys(this.commands);
        const sections = Object.keys(this.sections);
        
        if (value.startsWith('cd ')) {
            const partial = value.substring(3);
            const matches = sections.filter(section => section.startsWith(partial));
            if (matches.length === 1) {
                input.value = `cd ${matches[0]}`;
            }
        } else {
            const matches = commands.filter(cmd => cmd.startsWith(value));
            if (matches.length === 1) {
                input.value = matches[0];
            }
        }
    }
    
    addWelcomeMessage() {
        this.addOutput('Welcome to Interactive Portfolio Terminal v1.0', 'success');
        this.addOutput('Type "help" for available commands', 'info');
        this.addOutput('Navigate through sections using commands like "cd education", "cd skills", etc.', 'info');
        this.addOutput('');
    }
    
    // Command implementations
    showHelp() {
        this.addOutput('Available commands:', 'info');
        this.addOutput('');
        this.addOutput('Navigation:');
        this.addOutput('  ls                    - List all sections');
        this.addOutput('  cd [section]          - Navigate to section (e.g., cd skills)');
        this.addOutput('  pwd                   - Show current section');
        this.addOutput('');
        this.addOutput('Information:');
        this.addOutput('  cat [section]         - Show section information');
        this.addOutput('  whoami                - About the developer');
        this.addOutput('  tree                  - Show site structure');
        this.addOutput('');
        this.addOutput('Utility:');
        this.addOutput('  clear                 - Clear terminal');
        this.addOutput('  history               - Show command history');
        this.addOutput('  exit                  - Close terminal');
        this.addOutput('');
    }
    
    listSections() {
        this.addOutput('Available sections:', 'info');
        Object.keys(this.sections).forEach(section => {
            const indicator = section === this.currentSection ? '→' : ' ';
            this.addOutput(`${indicator} ${section}`);
        });
    }
    
    changeSection(args) {
        if (args.length === 0) {
            this.addOutput('Usage: cd [section]', 'error');
            return;
        }
        
        const section = args[0].toLowerCase();
        if (this.sections[section]) {
            this.navigateToSection(section);
            this.addOutput(`Navigated to ${section} section`, 'success');
            
            // Instant auto-hide terminal
            this.closeTerminal();
        } else {
            this.addOutput(`Section '${section}' not found. Use 'ls' to see available sections.`, 'error');
        }
    }
    
    showCurrentSection() {
        this.addOutput(`Current section: ${this.currentSection}`, 'info');
    }
    
    clearTerminal() {
        document.getElementById('terminal-output').innerHTML = '';
        this.addWelcomeMessage();
    }
    
    showWhoAmI() {
        this.addOutput('Developer: Your Name', 'info');
        this.addOutput('Role: Full Stack Developer', 'info');
        this.addOutput('Experience: 9 months', 'info');
        this.addOutput('Passion: Creating innovative web solutions', 'info');
    }
    
    showSectionInfo(args) {
        if (args.length === 0) {
            this.addOutput(`${this.currentSection}: ${this.sections[this.currentSection]}`, 'info');
        } else {
            const section = args[0].toLowerCase();
            if (this.sections[section]) {
                this.addOutput(`${section}: ${this.sections[section]}`, 'info');
            } else {
                this.addOutput(`Section '${section}' not found.`, 'error');
            }
        }
    }
    
    showSiteStructure() {
        this.addOutput('Portfolio Structure:', 'info');
        this.addOutput('├── home (introduction)', 'tree');
        this.addOutput('├── education (academic background)', 'tree');
        this.addOutput('├── skills (technical expertise)', 'tree');
        this.addOutput('├── experience (work history)', 'tree');
        this.addOutput('├── projects (portfolio showcase)', 'tree');
        this.addOutput('├── research (publications)', 'tree');
        this.addOutput('└── contact (get in touch)', 'tree');
    }
    
    showHistory() {
        if (this.commandHistory.length === 0) {
            this.addOutput('No command history available.', 'info');
        } else {
            this.addOutput('Command history:', 'info');
            this.commandHistory.forEach((cmd, index) => {
                this.addOutput(`${index + 1}: ${cmd}`);
            });
        }
    }
    
    showContactInfo() {
        this.addOutput('Contact Information:', 'info');
        this.addOutput('Email: your.email@example.com');
        this.addOutput('Phone: +1 (555) 123-4567');
        this.addOutput('LinkedIn: linkedin.com/in/yourprofile');
        this.addOutput('GitHub: github.com/yourusername');
    }
    
    showSkills() {
        this.addOutput('Technical Skills:', 'info');
        this.addOutput('Languages: JavaScript, Python, HTML/CSS, SQL');
        this.addOutput('Frameworks: React.js, Node.js, Django/Flask');
        this.addOutput('Tools: Git/GitHub, Docker, AWS/Vercel');
        this.addOutput('Problem Solving: LeetCode, HackerRank, Codeforces');
    }
    
    showProjects() {
        this.addOutput('Featured Projects:', 'info');
        this.addOutput('1. E-commerce Platform - Full-stack solution');
        this.addOutput('2. Task Management App - Real-time collaboration');
        this.addOutput('3. Portfolio Website - Interactive terminal navigation');
    }
    
    showAbout() {
        this.addOutput('About This Portfolio:', 'info');
        this.addOutput('An interactive portfolio website featuring terminal navigation');
        this.addOutput('Built with HTML, CSS, and JavaScript');
        this.addOutput('Unique design with stunning animations and gradients');
        this.addOutput('Navigate using terminal commands or the sidebar menu');
    }
}

// Enhanced Animation Controller
class AnimationController {
    constructor() {
        this.setupKonamiCode();
        this.setupProjectsCarousel();
        this.setupFormValidation();
    }
    
    setupKonamiCode() {
        const konamiCode = [
            'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
            'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
            'KeyB', 'KeyA'
        ];
        let konamiIndex = 0;
        
        document.addEventListener('keydown', (e) => {
            if (e.code === konamiCode[konamiIndex]) {
                konamiIndex++;
                if (konamiIndex === konamiCode.length) {
                    this.activateRainbowMode();
                    konamiIndex = 0;
                }
            } else {
                konamiIndex = 0;
            }
        });
    }
    
    activateRainbowMode() {
        document.body.style.animation = 'rainbow 2s infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 10000);
        
        // Add rainbow keyframes if not exists
        if (!document.querySelector('#rainbow-style')) {
            const style = document.createElement('style');
            style.id = 'rainbow-style';
            style.textContent = `
                @keyframes rainbow {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    setupProjectsCarousel() {
        const carousel = document.querySelector('.projects-carousel');
        if (!carousel) return;
        
        // Clone projects for infinite scroll
        const projects = carousel.children;
        const projectsArray = Array.from(projects);
        
        projectsArray.forEach(project => {
            const clone = project.cloneNode(true);
            carousel.appendChild(clone);
        });
        
        // Pause on hover
        carousel.addEventListener('mouseenter', () => {
            carousel.style.animationPlayState = 'paused';
        });
        
        carousel.addEventListener('mouseleave', () => {
            carousel.style.animationPlayState = 'running';
        });
    }
    
    setupFormValidation() {
        const form = document.getElementById('contact-form');
        if (!form) return;
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = form.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.textContent = 'Message Sent!';
                submitBtn.style.background = 'linear-gradient(135deg, #27ca3f 0%, #00f2fe 100%)';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    form.reset();
                }, 2000);
            }, 1500);
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing portfolio...');
    const terminal = new PortfolioTerminal();
    const animations = new AnimationController();
    console.log('Portfolio initialized successfully');
});

