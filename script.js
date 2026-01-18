        // Configuration object
        const defaultConfig = {
            church_name: "Chepsetyon AIC Bethel",
            church_motto: "Growing in Christ, Serving the Community",
            hero_verse: "Unless the LORD builds the house, the builders labor in vain. - Psalm 127:1",
            sunday_service: "9:00 AM - 12:00 PM",
            midweek_service: "Wednesday 6:00 PM",
            contact_phone: "+254 712 345 678",
            contact_email: "info@aicchepsetyon.org",
            contact_location: "Chepsetyon, Nandi County, Kenya"
        };

        let currentTestimonial = 0;
        let isDarkMode = false;

        // Data SDK initialization
        const dataHandler = {
            onDataChanged(data) {
                console.log('Data updated:', data.length, 'records');
            }
        };

        // Initialize Data SDK
        async function initDataSDK() {
            if (window.dataSdk) {
                const result = await window.dataSdk.init(dataHandler);
                if (!result.isOk) {
                    console.error("Failed to initialize Data SDK");
                }
            }
        }

        // Element SDK initialization
        async function onConfigChange(config) {
            // Update church name
            const churchNameElements = [
                document.getElementById('navChurchName'),
                document.getElementById('heroChurchName')
            ];
            churchNameElements.forEach(el => {
                if (el) el.textContent = config.church_name || defaultConfig.church_name;
            });

            // Update church motto
            const mottoEl = document.getElementById('heroMotto');
            if (mottoEl) mottoEl.textContent = config.church_motto || defaultConfig.church_motto;

            // Update hero verse
            const verseEl = document.getElementById('heroVerse');
            if (verseEl) verseEl.textContent = config.hero_verse || defaultConfig.hero_verse;

            // Update service times
            const sundayEl = document.getElementById('sundayService');
            if (sundayEl) sundayEl.textContent = config.sunday_service || defaultConfig.sunday_service;

            const midweekEl = document.getElementById('midweekService');
            if (midweekEl) midweekEl.textContent = config.midweek_service || defaultConfig.midweek_service;

            // Update contact information across all pages
            const phoneElements = [
                'givePhone', 'prayerPhoneContact', 'contactPhoneText', 'footerPhone', 'mpesaPhone'
            ];
            phoneElements.forEach(id => {
                const el = document.getElementById(id);
                if (el) el.textContent = config.contact_phone || defaultConfig.contact_phone;
            });

            const emailElements = [
                'giveEmail', 'contactEmailText', 'footerEmail'
            ];
            emailElements.forEach(id => {
                const el = document.getElementById(id);
                if (el) el.textContent = config.contact_email || defaultConfig.contact_email;
            });

            const locationElements = [
                'contactLocationText', 'contactMapLocation', 'footerLocation'
            ];
            locationElements.forEach(id => {
                const el = document.getElementById(id);
                if (el) {
                    const text = config.contact_location || defaultConfig.contact_location;
                    el.textContent = id === 'footerLocation' ? '📍 ' + text : text;
                }
            });

            const contactSundayEl = document.getElementById('contactSunday');
            if (contactSundayEl) contactSundayEl.textContent = config.sunday_service || defaultConfig.sunday_service;

            const contactWednesdayEl = document.getElementById('contactWednesday');
            if (contactWednesdayEl) contactWednesdayEl.textContent = config.midweek_service || defaultConfig.midweek_service;

            const footerServiceEl = document.getElementById('footerService');
            if (footerServiceEl) footerServiceEl.textContent = `🕐 Sunday Service: ${config.sunday_service || defaultConfig.sunday_service}`;

            const giveServiceTimeEl = document.getElementById('giveServiceTime');
            if (giveServiceTimeEl) giveServiceTimeEl.textContent = config.sunday_service || defaultConfig.sunday_service;
        }

        function mapToCapabilities(config) {
            return {
                recolorables: [],
                borderables: [],
                fontEditable: undefined,
                fontSizeable: undefined
            };
        }

        function mapToEditPanelValues(config) {
            return new Map([
                ['church_name', config.church_name || defaultConfig.church_name],
                ['church_motto', config.church_motto || defaultConfig.church_motto],
                ['hero_verse', config.hero_verse || defaultConfig.hero_verse],
                ['sunday_service', config.sunday_service || defaultConfig.sunday_service],
                ['midweek_service', config.midweek_service || defaultConfig.midweek_service],
                ['contact_phone', config.contact_phone || defaultConfig.contact_phone],
                ['contact_email', config.contact_email || defaultConfig.contact_email],
                ['contact_location', config.contact_location || defaultConfig.contact_location]
            ]);
        }

        // Initialize Element SDK
        if (window.elementSdk) {
            window.elementSdk.init({
                defaultConfig,
                onConfigChange,
                mapToCapabilities,
                mapToEditPanelValues
            });
        }

        // Navigation functionality
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('navLinks');
        const navLinkItems = document.querySelectorAll('.nav-link');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Page navigation
        navLinkItems.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetPage = link.getAttribute('href').substring(1);
                
                navLinkItems.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                showPage(targetPage);
                
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        });

        // Handle page link clicks
        document.querySelectorAll('.page-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetPage = link.getAttribute('href').substring(1);
                
                navLinkItems.forEach(l => l.classList.remove('active'));
                const navLink = document.querySelector(`.nav-link[href="#${targetPage}"]`);
                if (navLink) navLink.classList.add('active');
                
                showPage(targetPage);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        });

        // Handle hero button clicks
        document.querySelectorAll('.hero-buttons a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetPage = link.getAttribute('href').substring(1);
                
                navLinkItems.forEach(l => l.classList.remove('active'));
                const navLink = document.querySelector(`.nav-link[href="#${targetPage}"]`);
                if (navLink) navLink.classList.add('active');
                
                showPage(targetPage);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        });

        // Handle footer link clicks
        document.querySelectorAll('footer a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetPage = link.getAttribute('href').substring(1);
                
                navLinkItems.forEach(l => l.classList.remove('active'));
                const navLink = document.querySelector(`.nav-link[href="#${targetPage}"]`);
                if (navLink) navLink.classList.add('active');
                
                showPage(targetPage);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        });

        function showPage(pageId) {
            const allPages = document.querySelectorAll('.page-content');
            allPages.forEach(page => {
                page.style.display = 'none';
                page.classList.remove('active');
            });
            
            const targetPage = document.getElementById(pageId);
            if (targetPage) {
                targetPage.style.display = 'block';
                targetPage.classList.add('active');
            }
        }

        // Theme toggle
        const themeToggle = document.getElementById('themeToggle');
        themeToggle.addEventListener('click', () => {
            isDarkMode = !isDarkMode;
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', isDarkMode);
        });

        // Load saved theme preference
        const savedTheme = localStorage.getItem('darkMode');
        if (savedTheme === 'true') {
            isDarkMode = true;
            document.body.classList.add('dark-mode');
        }

        // Testimonial slider
        function showTestimonial(index) {
            const testimonials = document.querySelectorAll('.testimonial');
            const dots = document.querySelectorAll('.dot');
            
            testimonials.forEach((t, i) => {
                t.classList.remove('active');
                if (i === index) t.classList.add('active');
            });
            
            dots.forEach((d, i) => {
                d.classList.remove('active');
                if (i === index) d.classList.add('active');
            });
        }

        // Auto-rotate testimonials
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % 3;
            showTestimonial(currentTestimonial);
        }, 5000);

        // Dot click handlers
        document.querySelectorAll('.dot').forEach(dot => {
            dot.addEventListener('click', () => {
                currentTestimonial = parseInt(dot.dataset.slide);
                showTestimonial(currentTestimonial);
            });
        });

        // Prayer form submission
        const prayerForm = document.getElementById('prayerForm');
        const prayerMessage = document.getElementById('prayerMessage');

        prayerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = document.getElementById('prayerSubmitBtn');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="loading"></span> Submitting...';
            
            const formData = {
                id: 'prayer_' + Date.now(),
                type: 'prayer',
                name: document.getElementById('prayerName').value,
                phone: document.getElementById('prayerPhone').value,
                email: document.getElementById('prayerEmail').value || '',
                message: document.getElementById('prayerRequest').value,
                timestamp: new Date().toISOString(),
                status: 'pending'
            };

            if (window.dataSdk) {
                const result = await window.dataSdk.create(formData);
                
                if (result.isOk) {
                    prayerMessage.textContent = 'Thank you! Your prayer request has been submitted. Our prayer team will be praying for you.';
                    prayerMessage.className = 'form-message success';
                    prayerMessage.style.display = 'block';
                    prayerForm.reset();
                } else {
                    prayerMessage.textContent = 'There was an error submitting your request. Please try again or contact us directly.';
                    prayerMessage.className = 'form-message error';
                    prayerMessage.style.display = 'block';
                }
            }
            
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit Prayer Request';
            
            setTimeout(() => {
                prayerMessage.style.display = 'none';
            }, 5000);
        });

        // Contact form submission
        const contactForm = document.getElementById('contactForm');
        const contactMessage = document.getElementById('contactMessage');

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = document.getElementById('contactSubmitBtn');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="loading"></span> Sending...';
            
            const formData = {
                id: 'contact_' + Date.now(),
                type: 'contact',
                name: document.getElementById('contactName').value,
                phone: document.getElementById('contactFormPhone').value,
                email: document.getElementById('contactFormEmail').value,
                message: document.getElementById('contactSubject').value + ': ' + document.getElementById('contactFormMessage').value,
                timestamp: new Date().toISOString(),
                status: 'pending'
            };

            if (window.dataSdk) {
                const result = await window.dataSdk.create(formData);
                
                if (result.isOk) {
                    contactMessage.textContent = 'Thank you! Your message has been sent. We will get back to you soon.';
                    contactMessage.className = 'form-message success';
                    contactMessage.style.display = 'block';
                    contactForm.reset();
                } else {
                    contactMessage.textContent = 'There was an error sending your message. Please try again or contact us directly.';
                    contactMessage.className = 'form-message error';
                    contactMessage.style.display = 'block';
                }
            }
            
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
            
            setTimeout(() => {
                contactMessage.style.display = 'none';
            }, 5000);
        });

        // Helper function for info messages
        function showInfoMessage(message) {
            const backdrop = document.createElement('div');
            backdrop.className = 'modal-backdrop';
            
            const modal = document.createElement('div');
            modal.className = 'inline-modal';
            modal.innerHTML = `
                <p style="margin-bottom: 1.5rem;">${message}</p>
                <button class="btn btn-primary btn-small" onclick="closeModal()">Close</button>
            `;
            
            document.body.appendChild(backdrop);
            document.body.appendChild(modal);
            
            window.closeModal = function() {
                backdrop.remove();
                modal.remove();
            };
            
            backdrop.addEventListener('click', window.closeModal);
        }

        // Initialize on load
        async function initializeApp() {
            await initDataSDK();
            if (window.elementSdk && window.elementSdk.config) {
                await onConfigChange(window.elementSdk.config);
            } else {
                await onConfigChange(defaultConfig);
            }
            showPage('home');
        }

        // Run initialization
        initializeApp();