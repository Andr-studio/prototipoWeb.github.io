document.addEventListener('DOMContentLoaded', () => {
        const loginButton = document.getElementById('login-button');
        const loginSection = document.getElementById('login-section');
        const dashboardContent = document.getElementById('dashboard-content');
        const sidebar = document.getElementById('sidebar');
        const savePreferencesButton = document.getElementById('save-preferences-button');
        const savePreferencesFeedback = document.getElementById('save-preferences-feedback');
        const googleLoginButton = document.getElementById('google-login-button');
        const projectList = document.getElementById('project-list');
        const selectedProjectNameDisplay = document.getElementById('selected-project-name');
        const selectedProjectDescriptionDisplay = document.getElementById('selected-project-description');
        const logoutButtonSidebar = document.getElementById('logout-button-sidebar');
        const chartTypeSelect = document.getElementById('chart-type');
        const progressFormatSelect = document.getElementById('progress-format');
        const updateVisualizationButton = document.getElementById('update-visualization-button');
        const errorMessage = document.getElementById('error-message');
        const registerLink = document.getElementById('register-link');
        const projectSummaryCard = document.getElementById('project-summary-card');
        const projectSummaryLoader = document.getElementById('project-summary-loader');
        const projectSummaryText = document.getElementById('project-summary-text');
        const projectSummaryDetailsContainer = document.getElementById('project-summary-details');
        const recentActivityCard = document.getElementById('recent-activity-card');
        const recentActivityLoader = document.getElementById('recent-activity-loader');
        const recentActivityList = document.getElementById('recent-activity-list');
        const generalProgressCard = document.getElementById('general-progress-card');
        const timelineLoader = document.getElementById('timeline-loader');
        const projectTimeline = document.getElementById('project-timeline');
        const themeToggleButton = document.getElementById('theme-toggle-button');
        const realtimeStatusIndicator = document.getElementById('realtime-status-indicator');
        const exportPdfButton = document.getElementById('export-pdf-button');
        const exportCsvButton = document.getElementById('export-csv-button');
        const generateAiSummaryButton = document.getElementById('generate-ai-summary-button');
        const aiProjectSummaryOutput = document.getElementById('ai-project-summary-output');
        const aiSummaryLoader = document.getElementById('ai-summary-loader');

        // Chatbot elements
        const chatbotFab = document.getElementById('chatbot-fab');
        const chatbotPanel = document.getElementById('chatbot-panel');
        const closeChatbotButton = document.getElementById('close-chatbot-button');
        const chatbotMessages = document.getElementById('chatbot-messages');
        const chatbotInput = document.getElementById('chatbot-input');
        const chatbotSendButton = document.getElementById('chatbot-send-button');


        // Notification Preference Checkboxes
        const prefEmailCheckbox = document.getElementById('email-notifications'); // Corrected ID
        const prefWeeklySummaryCheckbox = document.getElementById('weekly-summary'); // Corrected ID
        const prefMilestoneCheckbox = document.getElementById('milestone-completion'); // Corrected ID
        const prefMajorUpdatesCheckbox = document.getElementById('major-updates'); // Corrected ID


        const userAvatarEl = document.getElementById('user-avatar');
        const sidebarUsernameDisplayEl = document.getElementById('sidebar-username-display');
        const tooltipAvatarEl = document.getElementById('tooltip-avatar');
        const tooltipUserNameEl = document.getElementById('tooltip-user-name');
        const tooltipUserEmailEl = document.getElementById('tooltip-user-email');
        const tooltipAccountTypeEl = document.getElementById('tooltip-account-type');

        // Tour elements
        const sidebarProjectTitle = document.getElementById('proyectos-sidebar-title');
        let appTour = null;
        let tourTriggerIcon = null;


        let selectedProjectId = null;
        let currentUser = null;

        // Function to apply the saved theme or system preference
        const applyTheme = () => {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) {
                document.body.classList.toggle('dark-mode', savedTheme === 'dark');
            } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.body.classList.add('dark-mode');
            }
            updateRealtimeStatusIndicator(); // Update indicator based on theme
        };
        
        // Theme toggle button event listener
        if (themeToggleButton) {
            themeToggleButton.addEventListener('click', () => {
                document.body.classList.toggle('dark-mode');
                const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
                localStorage.setItem('theme', currentTheme);
                updateRealtimeStatusIndicator(); // Update indicator on theme change
            });
        }
        
        function updateRealtimeStatusIndicator() {
            if (realtimeStatusIndicator) {
                const icon = realtimeStatusIndicator.querySelector('svg');
                if (document.body.classList.contains('dark-mode')) {
                    realtimeStatusIndicator.style.backgroundColor = 'var(--ios-dark-gray-4)';
                    if(icon) icon.style.fill = 'var(--realtime-indicator-icon-fill)';
                } else {
                    realtimeStatusIndicator.style.backgroundColor = 'var(--ios-light-gray-track)';
                     if(icon) icon.style.fill = 'var(--realtime-indicator-icon-fill)';
                }
            }
        }

        const newTeamMembers = ["Andrés Rivera", "Fabián García", "Fredy Carrizo"];

        const projectData = { 
            '1': { 
                nombre: 'Plataforma e-commerce', cliente: 'Innovatech Solutions', 
                descripcion: "Desarrollo de una plataforma e-commerce B2C con pasarela de pagos y gestión de inventario.", 
                resumen: { 
                    estado: 'En Desarrollo Avanzado', fechaInicio: '2025-01-15', fechaFinEstimada: '2025-07-30', 
                    equipo: [ 
                        `${newTeamMembers[0]} (Líder)`, 
                        `${newTeamMembers[1]} (Frontend)`, 
                        `${newTeamMembers[2]} (Backend)`
                    ], 
                    presupuesto: 50000, tecnologias: ['React', 'Node.js', 'PostgreSQL', 'AWS'] 
                }, 
                metricas: ['progreso', 'tareasCompletadas', 'costo', 'tiempoRestante', 'ubicacion'], 
                tareas: [ 
                    { id: 't1a', nombre: "Definición de Alcance Completa", fechaInicio: "2025-01-15", fechaFinEstimada: "2025-01-30", progreso: 100, costo: 2000, ubicacion: 'Oficina Central', detalles: "Objetivos, entregables y cronograma detallados y aprobados.", 
                        feedback: [ 
                            {id: 'fb1', usuario: 'Cliente Innovatech', comentario: 'Todo claro con el alcance, ¡adelante!', fecha: '2025-01-28T10:00:00Z', tipo:'cliente', replies: [
                                {id: 'fb1-r1', usuario: 'Andrés Rivera', comentario: '¡Excelente! Empezamos con el diseño.', fecha: '2025-01-28T11:00:00Z', tipo:'equipo', replies: []}
                            ]}, 
                            {id: 'fb2', usuario: 'Andrés Rivera', comentario: 'Recibido, gracias por la confirmación.', fecha: '2025-01-29T09:00:00Z', tipo:'equipo', replies: []}
                        ],
                        attachments: [
                            { id: 'att1a1', name: 'documento_alcance_v1.pdf', url: '#', user: 'Andrés Rivera', date: '2025-01-25T10:00:00Z' }, 
                            { id: 'att1a2', name: 'aprobacion_cliente.eml', url: '#', user: 'Cliente Innovatech', date: '2025-01-28T10:05:00Z' }
                        ]
                    }, 
                    { id: 't1b', nombre: "Diseño UI/UX Prototipos Finales", fechaInicio: "2025-02-01", fechaFinEstimada: "2025-02-28", progreso: 100, costo: 5000, ubicacion: 'Remoto', detalles: "Wireframes, mockups y prototipos interactivos validados.", feedback: [], attachments: [] }, 
                    { id: 't1c', nombre: "Desarrollo Frontend (Módulos Clave)", fechaInicio: "2025-03-01", fechaFinEstimada: "2025-05-15", progreso: 70, costo: 15000, ubicacion: 'Oficina Desarrollo', detalles: "Catálogo, carrito, checkout, perfiles.", feedback: [ {id: 'fb3', usuario: 'Cliente Innovatech', comentario: 'El prototipo del carrito se ve bien, pero ¿podemos ajustar el color del botón de compra?', fecha: '2025-04-10T15:00:00Z', tipo:'cliente', replies: []} ], attachments: [] }, 
                    { id: 't1d', nombre: "Desarrollo Backend (API y BD)", fechaInicio: "2025-03-10", fechaFinEstimada: "2025-05-30", progreso: 60, costo: 18000, ubicacion: 'Oficina Desarrollo', detalles: "API RESTful, BD, lógica de negocio.", feedback: [], attachments: [] }, 
                    { id: 't1e', nombre: "Integración Pasarela de Pagos", fechaInicio: "2025-05-01", fechaFinEstimada: "2025-06-10", progreso: 25, costo: 4000, ubicacion: 'Remoto', detalles: "Integración segura con Stripe/PayPal.", feedback: [], attachments: [] } 
                ], 
                actividadReciente: [ 
                    { usuario: 'Fredy Carrizo', accion: 'Actualizó la tarea "Desarrollo Backend"', tiempo: '2025-05-24T10:00:00Z', tipo: 'tarea' }, 
                    { usuario: 'Andrés Rivera', accion: 'Añadió un comentario en "Integración Pasarela de Pagos"', tiempo: '2025-05-24T08:00:00Z', tipo: 'comentario' }, 
                    { usuario: 'Sistema', accion: 'Hito "Diseño UI/UX Prototipos Finales" completado.', tiempo: '2025-05-23T17:00:00Z', tipo: 'hito' } 
                ] 
            },
            '2': { 
                nombre: 'App Bienestar Movil', cliente: 'Innovatech Solutions', 
                descripcion: "App móvil para seguimiento de bienestar y hábitos saludables.", 
                resumen: { 
                    estado: 'En Planificación', fechaInicio: '2025-06-01', fechaFinEstimada: '2025-12-15', 
                    equipo: [ 
                        `${newTeamMembers[0]} (Scrum Master)`, 
                        `${newTeamMembers[1]} (Diseño UX)`, 
                        `${newTeamMembers[2]} (Móvil Dev)`
                    ], 
                    presupuesto: 75000, tecnologias: ['Flutter', 'Firebase', 'Google Fit API'] 
                }, 
                metricas: ['progreso', 'tareasPendientes', 'tiempoRestante'], 
                tareas: [ 
                    { id: 't2a', nombre: "Investigación de Mercado", fechaInicio: "2025-06-01", fechaFinEstimada: "2025-06-15", progreso: 30, detalles: "Análisis de apps similares, público objetivo.", feedback: [], attachments: [] }, 
                    { id: 't2b', nombre: "Definición de MVP", fechaInicio: "2025-06-16", fechaFinEstimada: "2025-06-30", progreso: 10, detalles: "Priorización de características para MVP.", feedback: [], attachments: [] } 
                ], 
                actividadReciente: [ 
                    { usuario: 'Andrés Rivera', accion: 'Creó la tarea "Definición de MVP y User Stories"', tiempo: '2025-05-22T14:00:00Z', tipo: 'tarea' }, 
                    { usuario: 'Fabián García', accion: 'Subió bocetos iniciales para el flujo de registro', tiempo: '2025-05-23T11:00:00Z', tipo: 'archivo' } 
                ] 
            },
            '3': { 
                nombre: 'Sistema LMS Corporativo', cliente: 'Innovatech Solutions', 
                descripcion: "Plataforma LMS para cursos corporativos.", 
                resumen: { 
                    estado: 'Mantenimiento y Nuevas Funcionalidades', fechaInicio: '2024-01-10', fechaFinEstimada: 'N/A (Continuo)', 
                    equipo: [ 
                        `${newTeamMembers[0]} (Product Owner)`, 
                        `${newTeamMembers[1]} (Fullstack)`,
                        `${newTeamMembers[2]} (Developer)`
                    ], 
                    presupuesto: 'Variable por sprint', tecnologias: ['Django', 'Vue.js', 'Docker', 'Azure'] 
                }, 
                metricas: ['costo', 'tareasCompletadas'], 
                tareas: [ 
                    { id: 't3a', nombre: "Módulo de Gamificación", fechaInicio: "2025-05-01", fechaFinEstimada:"2025-05-20", progreso: 80, costo: 3500, detalles: "Insignias y puntos.", feedback: [], attachments: [] }, 
                    { id: 't3b', nombre: "Optimizar Carga de Videos", fechaInicio: "2025-05-10", fechaFinEstimada: "2025-05-25", progreso: 50, costo: 2000, detalles: "Mejorar streaming.", feedback: [], attachments: [] } 
                ], 
                actividadReciente: [ 
                    { usuario: 'Fabián García', accion: 'Commit: "Refactorización del servicio de video"', tiempo: '2025-05-24T12:15:00Z', tipo: 'codigo' }, 
                    { usuario: 'Andrés Rivera', accion: 'Priorizó la tarea "Actualizar Reportes"', tiempo: '2025-05-24T09:30:00Z', tipo: 'tarea' } 
                ] 
            }
        };
        
        Object.keys(projectData).forEach(projectId => {
            const project = projectData[projectId];
            const originalTeam = project.resumen.equipo;
            const newTeam = [];
            for (let i = 0; i < newTeamMembers.length; i++) {
                let role = "(Developer)"; 
                if (i < originalTeam.length) {
                    const match = originalTeam[i].match(/\(([^)]+)\)/); 
                    if (match && match[1]) {
                        role = `(${match[1]})`;
                    }
                }
                if (originalTeam.length < newTeamMembers.length && i >= originalTeam.length) {
                }
                newTeam.push(`${newTeamMembers[i]} ${role}`);
            }
            project.resumen.equipo = newTeam.slice(0, Math.max(originalTeam.length, newTeamMembers.length, 3)); 
             if (projectId === '3' && project.resumen.equipo.length < 3) {
                for (let i = project.resumen.equipo.length; i < newTeamMembers.length; i++) {
                     project.resumen.equipo.push(`${newTeamMembers[i]} (Developer)`);
                }
            }
            project.resumen.equipo = project.resumen.equipo.slice(0, newTeamMembers.length);
        });


        Object.keys(projectData).forEach(key => {
            if (!projectData[key].resumen) projectData[key].resumen = { estado: 'N/A', fechaInicio: 'N/A', fechaFinEstimada: 'N/A', equipo: [], presupuesto: 0, tecnologias: [] };
            if (!projectData[key].actividadReciente) projectData[key].actividadReciente = [];
            projectData[key].tareas.forEach(tarea => { 
                if (!tarea.feedback) tarea.feedback = [];
                tarea.feedback.forEach(fb => { if(!fb.replies) fb.replies = []; });
                if (!tarea.attachments) tarea.attachments = []; 
            });
        });

        function getInitials(name) {
            if (!name || typeof name !== 'string') return '?';
            const parts = name.replace(/\(.*?\)/g, '').trim().split(' ');
            if (parts.length === 0 || parts[0] === '') return '?';
            if (parts.length === 1) {
                return parts[0].substring(0, 2).toUpperCase();
            }
            let initials = parts[0].charAt(0);
            if (parts.length > 1 && parts[parts.length - 1]) {
                initials += parts[parts.length - 1].charAt(0);
            } else if (parts[0].length > 1) {
                 initials += parts[0].charAt(1);
            }
            return initials.toUpperCase();
        }

        function updateUserAvatarAndTooltip() {
            if (!currentUser) return;
            const initials = getInitials(currentUser.nombre);
            const cleanName = currentUser.nombre.replace(/\s*\(.*?\)\s*/g, '').trim();

            if (userAvatarEl) userAvatarEl.textContent = initials;
            if (sidebarUsernameDisplayEl) sidebarUsernameDisplayEl.textContent = cleanName;
            if (tooltipAvatarEl) tooltipAvatarEl.textContent = initials;
            if (tooltipUserNameEl) tooltipUserNameEl.textContent = cleanName;
            if (tooltipUserEmailEl) tooltipUserEmailEl.textContent = currentUser.email || 'Email no disponible';
            if (tooltipAccountTypeEl) {
                tooltipAccountTypeEl.textContent = currentUser.tipo === 'cliente' ? 'Cuenta de cliente' : 'Cuenta de equipo';
            }
        }

        function showLoader(loaderElement, textContentElement, listContainerElement) { if (loaderElement) loaderElement.classList.remove('hidden'); if (textContentElement) textContentElement.classList.add('hidden'); if (listContainerElement && listContainerElement !== textContentElement) listContainerElement.classList.add('hidden'); }
        function hideLoader(loaderElement, textContentElement, listContainerElement) { if (loaderElement) loaderElement.classList.add('hidden'); if (textContentElement) textContentElement.classList.remove('hidden'); if (listContainerElement && listContainerElement !== textContentElement) listContainerElement.classList.remove('hidden');}
        function applyFlashEffect(element) { if(element) { element.classList.add('content-flash'); element.addEventListener('animationend', () => { element.classList.remove('content-flash'); }, { once: true }); } }

        function showLogin() {
            loginSection.classList.remove('hidden'); loginSection.classList.add('flex');
            dashboardContent.classList.add('hidden'); dashboardContent.classList.remove('flex');
            sidebar.classList.add('hidden'); sidebar.classList.remove('flex');
            if(chatbotFab) {
                chatbotFab.classList.add('hidden');
                chatbotFab.classList.remove('chatbot-fab-hidden'); 
            }
            if(chatbotPanel) chatbotPanel.classList.remove('open');

            if (errorMessage) errorMessage.classList.add('hidden');
            if (selectedProjectNameDisplay) selectedProjectNameDisplay.textContent = 'Ninguno seleccionado';
            if (selectedProjectDescriptionDisplay) selectedProjectDescriptionDisplay.textContent = 'Vista general y actualizaciones de tu proyecto de software.';
            if (projectSummaryText) projectSummaryText.textContent = 'Selecciona un proyecto para ver su resumen.';
            if (projectSummaryDetailsContainer) projectSummaryDetailsContainer.innerHTML = '';
            if (aiProjectSummaryOutput) aiProjectSummaryOutput.classList.add('hidden');
            const pActividad = recentActivityList.querySelector('p');
            if (pActividad) pActividad.classList.remove('hidden'); else if(recentActivityList) recentActivityList.innerHTML = '<p>Selecciona un proyecto para ver la actividad reciente.</p>';
            const pHitos = projectTimeline.querySelector('p');
            if (pHitos) pHitos.classList.remove('hidden'); else if (projectTimeline) projectTimeline.innerHTML = '<p class="p-4">Selecciona un proyecto para ver sus hitos.</p>';
            const barraProgreso = document.getElementById('barra-progreso');
            const textoProgreso = document.getElementById('texto-progreso');
            if (barraProgreso) barraProgreso.style.width = '0%';
            if (textoProgreso) textoProgreso.textContent = '0% Completado';
            hideLoader(projectSummaryLoader, projectSummaryText, projectSummaryDetailsContainer);
            hideLoader(recentActivityLoader, recentActivityList.querySelector('p'), recentActivityList);
            hideLoader(timelineLoader, projectTimeline.querySelector('p'), projectTimeline);
            if(aiSummaryLoader) aiSummaryLoader.classList.add('hidden');
             // Remove tour icon if present
            if (tourTriggerIcon && tourTriggerIcon.parentNode) {
                tourTriggerIcon.parentNode.removeChild(tourTriggerIcon);
                tourTriggerIcon = null;
            }
        }

        function showMainContent() {
            loginSection.classList.add('hidden'); loginSection.classList.remove('flex');
            dashboardContent.classList.remove('hidden'); dashboardContent.classList.add('flex');
            sidebar.classList.remove('hidden'); sidebar.classList.add('flex');
            if(chatbotFab) chatbotFab.classList.remove('hidden');
             if(chatbotPanel && chatbotPanel.classList.contains('open')){ 
                chatbotFab.classList.add('chatbot-fab-hidden');
            } else if (chatbotFab) {
                chatbotFab.classList.remove('chatbot-fab-hidden');
            }


            updateUserAvatarAndTooltip();
            if (errorMessage) errorMessage.classList.add('hidden');
            initializeProjectSelection();
            if (!selectedProjectId && Object.keys(projectData).length > 0) {
                const firstProjectId = Object.keys(projectData)[0];
                selectProject(firstProjectId);
            } else if (selectedProjectId) {
                actualizarDashboardConFeedback(selectedProjectId, false); 
            } else {
                if (selectedProjectNameDisplay) selectedProjectNameDisplay.textContent = 'Ningún proyecto disponible';
                if (projectTimeline) projectTimeline.innerHTML = '<p class="p-4">No hay proyectos para mostrar hitos.</p>';
                if (recentActivityList) recentActivityList.innerHTML = '<p>No hay proyectos para mostrar actividad.</p>';
                if (projectSummaryText) projectSummaryText.textContent = 'No hay proyectos disponibles.';
                if (aiProjectSummaryOutput) aiProjectSummaryOutput.classList.add('hidden');
            }
            // Initialize and manage the tour
            handleAppTour();
        }

        loginButton.addEventListener('click', () => {
            const emailInput = document.getElementById('email');
            const passwordInput = document.getElementById('password');
            const emailValue = emailInput.value.trim();
            const passwordValue = passwordInput.value.trim();
            if (emailValue === '' || passwordValue === '') {
                if (errorMessage) { errorMessage.textContent = 'Por favor, ingresa tu correo electrónico y contraseña.'; errorMessage.classList.remove('hidden'); }
                return;
            }
            if (emailValue === 'demo@example.com' && passwordValue === 'password') {
                localStorage.setItem('loggedIn', 'true');
                currentUser = { nombre: "Cliente Demo", tipo: "cliente", email: "demo@example.com" };
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                showMainContent();
            } else if (emailValue === 'dev@example.com' && passwordValue === 'password') {
                localStorage.setItem('loggedIn', 'true');
                currentUser = { nombre: "Ana Pérez (Dev)", tipo: "equipo", email: "dev@example.com" }; 
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                showMainContent();
            } else {
                if (errorMessage) { errorMessage.textContent = 'Credenciales inválidas. Por favor, intenta de nuevo.'; errorMessage.classList.remove('hidden'); }
            }
        });

        googleLoginButton.addEventListener('click', () => {
            localStorage.setItem('loggedIn', 'true');
            currentUser = { nombre: "Usuario Google", tipo: "cliente", email: "usuario.google@example.com" };
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            showMainContent();
        });

        logoutButtonSidebar.addEventListener('click', () => {
            localStorage.removeItem('loggedIn'); localStorage.removeItem('currentUser');
            selectedProjectId = null; currentUser = null;
            if (appTour && appTour.isActive()) { // If tour is active, cancel it
                appTour.cancel();
            }
            showLogin();
        });

        if(registerLink) { registerLink.addEventListener('click', (e) => { e.preventDefault(); alert('Funcionalidad de registro no implementada en esta demo.'); }); }

        initializeProjectSelection = () => {
            if (!projectList) return;
            projectList.innerHTML = '';
            Object.keys(projectData).forEach(projectId => {
                const project = projectData[projectId];
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 project-icon flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                    </svg>
                    <span class="truncate">${project.nombre}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 ml-auto checkmark-icon flex-shrink-0"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>
                `;
                listItem.dataset.projectId = projectId;
                listItem.addEventListener('click', () => selectProject(projectId));
                listItem.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { selectProject(projectId); } });
                projectList.appendChild(listItem);
            });
        };
        selectProject = (projectId) => {
            selectedProjectId = projectId;
            const project = projectData[projectId];
            if (selectedProjectNameDisplay) selectedProjectNameDisplay.textContent = project.nombre;
            if (selectedProjectDescriptionDisplay) selectedProjectDescriptionDisplay.textContent = project.descripcion || "Descripción no disponible.";
             if (aiProjectSummaryOutput) { 
                aiProjectSummaryOutput.innerHTML = '';
                aiProjectSummaryOutput.classList.add('hidden');
            }
            const projectItems = projectList.querySelectorAll('li');
            projectItems.forEach(item => {
                item.classList.toggle('selected', item.dataset.projectId === projectId);
            });
            actualizarDashboardConFeedback(projectId, false); 
        };
        analizarProgreso = (tareas) => { if (!tareas || tareas.length === 0) return { progresoPromedio: 0, tareasEnRiesgo: 0 }; const hoy = new Date(); let progresoGeneralSuma = 0; let tareasEnRiesgo = 0; tareas.forEach(tarea => { const progresoActual = tarea.progreso / 100; progresoGeneralSuma += progresoActual; if (tarea.fechaInicio && tarea.fechaFinEstimada) { const fechaInicio = new Date(tarea.fechaInicio); const fechaFinEstimada = new Date(tarea.fechaFinEstimada); if (fechaFinEstimada < fechaInicio) return; const duracionTotal = fechaFinEstimada.getTime() - fechaInicio.getTime(); if (duracionTotal <= 0) return; const tiempoTranscurrido = Math.max(0, hoy.getTime() - fechaInicio.getTime()); const progresoEsperado = Math.min(1, tiempoTranscurrido / duracionTotal); if (progresoActual < progresoEsperado - 0.20 && progresoActual < 0.99 && hoy > fechaInicio) { tareasEnRiesgo++; } } }); const progresoPromedio = (progresoGeneralSuma / tareas.length) * 100; return { progresoPromedio: Math.min(100, Math.max(0, progresoPromedio)), tareasEnRiesgo }; };
        
        function simulateRealtimeUpdate(updateData) {
            console.log("Simulando envío WebSocket:", updateData);
            setTimeout(() => {
                handleIncomingRealtimeUpdate(updateData);
            }, 250); 
        }

        function handleIncomingRealtimeUpdate(message) {
            console.log("Simulando recepción WebSocket:", message);
            if (!projectData[message.projectId] || message.projectId !== selectedProjectId) return;

            const project = projectData[selectedProjectId];
            switch (message.type) {
                case 'new_feedback':
                    if (message.activity && project.actividadReciente) {
                        if (!project.actividadReciente.find(act => act.tiempo === message.activity.tiempo && act.accion === message.activity.accion)) {
                            project.actividadReciente.unshift(message.activity);
                        }
                        actualizarListaActividadReciente(project.actividadReciente);
                        if (recentActivityCard) applyFlashEffect(recentActivityCard);
                    }

                    const tareaAfectadaFeedback = project.tareas.find(t => t.id === message.taskId);
                    if (tareaAfectadaFeedback) {
                        let parentFeedbackArray;
                        if (message.parentFeedbackId) { 
                            const findParentRecursive = (feedbacks) => {
                                for (let fb of feedbacks) {
                                    if (fb.id === message.parentFeedbackId) return fb.replies;
                                    if (fb.replies && fb.replies.length > 0) {
                                        const foundInReplies = findParentRecursive(fb.replies);
                                        if (foundInReplies) return foundInReplies;
                                    }
                                }
                                return null;
                            };
                            parentFeedbackArray = findParentRecursive(tareaAfectadaFeedback.feedback);
                        } else { 
                            parentFeedbackArray = tareaAfectadaFeedback.feedback;
                        }

                        if (parentFeedbackArray) {
                             if (!parentFeedbackArray.find(fb => fb.id === message.feedback.id)) { 
                                parentFeedbackArray.push(message.feedback);
                            }
                        }
                        
                        const feedbackListContainer = document.getElementById(`feedback-list-${message.taskId}`);
                        if (feedbackListContainer) {
                            renderFeedbackList(tareaAfectadaFeedback.feedback, feedbackListContainer, message.taskId);
                            const timelineItemElement = feedbackListContainer.closest('.timeline-item, .list-none > div, .calendario-item-container');
                            if (timelineItemElement) applyFlashEffect(timelineItemElement);
                        }
                    }
                    break;
                case 'new_attachment':
                    if (message.activity && project.actividadReciente) {
                        if (!project.actividadReciente.find(act => act.tiempo === message.activity.tiempo && act.accion === message.activity.accion)) {
                            project.actividadReciente.unshift(message.activity);
                        }
                        actualizarListaActividadReciente(project.actividadReciente);
                        if (recentActivityCard) applyFlashEffect(recentActivityCard);
                    }
                    const tareaAfectadaAttachment = project.tareas.find(t => t.id === message.taskId);
                    if (tareaAfectadaAttachment) {
                        if (!tareaAfectadaAttachment.attachments.find(att => att.id === message.attachment.id)) {
                            tareaAfectadaAttachment.attachments.push(message.attachment);
                        }
                        const attachmentsContainer = document.getElementById(`attachments-list-${message.taskId}`);
                        if (attachmentsContainer) {
                            renderAttachments(tareaAfectadaAttachment.attachments, attachmentsContainer);
                             const timelineItemElement = attachmentsContainer.closest('.timeline-item, .list-none > div, .calendario-item-container');
                            if (timelineItemElement) applyFlashEffect(timelineItemElement);
                        }
                    }
                    break;
                default:
                    console.warn("Tipo de mensaje WebSocket no manejado:", message.type);
            }
        }


        actualizarDashboardConFeedback = (projectId, isButtonTriggered) => { 
            showLoader(projectSummaryLoader, projectSummaryText, projectSummaryDetailsContainer); 
            showLoader(recentActivityLoader, recentActivityList.querySelector('p'), recentActivityList); 
            if (isButtonTriggered) { 
                showLoader(timelineLoader, projectTimeline.querySelector('p'), projectTimeline); 
            }
            setTimeout(() => { 
                actualizarDashboard(projectId); 
                hideLoader(projectSummaryLoader, projectSummaryText, projectSummaryDetailsContainer); 
                applyFlashEffect(projectSummaryCard); 
                hideLoader(recentActivityLoader, null, recentActivityList); 
                applyFlashEffect(recentActivityCard); 
                if (isButtonTriggered) { 
                    hideLoader(timelineLoader, null, projectTimeline); 
                    applyFlashEffect(generalProgressCard); 
                }
                if (isButtonTriggered && updateVisualizationButton) { 
                    updateVisualizationButton.disabled = false; 
                    updateVisualizationButton.textContent = 'Actualizar'; 
                } 
            }, 500); 
        };
        
        function createFeedbackItemDOM(fb, taskId, level) {
            const fbItem = document.createElement('li');
            fbItem.classList.add('feedback-item', `feedback-${fb.tipo}`);
            fbItem.style.marginLeft = `${level * 20}px`; 
            fbItem.innerHTML = `
                <p>${fb.comentario.replace(/\n/g, '<br>')}</p>
                <p class="feedback-meta">
                    <strong>${fb.usuario}</strong> - 
                    ${new Date(fb.fecha).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric', hour:'2-digit', minute: '2-digit' })}
                </p>
                <a class="feedback-reply-link" data-task-id="${taskId}" data-feedback-id="${fb.id}">Responder</a>
            `;

            const repliesContainerId = `replies-to-${fb.id}`;
            const repliesContainer = document.createElement('ul');
            repliesContainer.classList.add('feedback-replies-container');
            repliesContainer.id = repliesContainerId;
            fbItem.appendChild(repliesContainer);

            if (fb.replies && fb.replies.length > 0) {
                renderFeedbackList(fb.replies, repliesContainer, taskId, level + 1, fb.id); 
            }
            
            const replyLink = fbItem.querySelector('.feedback-reply-link');
            replyLink.addEventListener('click', (e) => {
                e.preventDefault();
                const targetFeedbackId = e.target.dataset.feedbackId;
                const targetTaskId = e.target.dataset.taskId;
                showReplyForm(targetTaskId, targetFeedbackId, fbItem);
            });
            return fbItem;
        }

        function renderFeedbackList(feedbackArray, listElement, taskId, level = 0, parentOfReplies = null) {
            if (level === 0) { 
                 listElement.innerHTML = '';
            }
            if (!feedbackArray || feedbackArray.length === 0) {
                if (level === 0) listElement.innerHTML = '<li class="text-xs italic px-2" style="margin-left: 0px;">No hay feedback para esta tarea aún.</li>';
                return;
            }
            feedbackArray.sort((a, b) => new Date(a.fecha) - new Date(b.fecha)); 
            
            feedbackArray.forEach(fb => {
                const fbItemDOM = createFeedbackItemDOM(fb, taskId, level);
                listElement.appendChild(fbItemDOM);
            });
        }
        
        function showReplyForm(taskId, parentFeedbackId, parentFeedbackElement) {
            const existingReplyForms = document.querySelectorAll('.feedback-reply-form-container');
            existingReplyForms.forEach(form => form.remove());

            const replyFormContainer = document.createElement('div');
            replyFormContainer.classList.add('feedback-reply-form-container', 'feedback-reply-form'); 

            const textarea = document.createElement('textarea');
            textarea.rows = "2";
            textarea.placeholder = "Escribe tu respuesta...";
            
            const submitButton = document.createElement('button');
            submitButton.textContent = "Enviar Respuesta";
            submitButton.onclick = () => {
                const feedbackListElement = parentFeedbackElement.closest('.feedback-list');
                handleFeedbackSubmit(selectedProjectId, taskId, textarea, feedbackListElement, parentFeedbackId);
                replyFormContainer.remove(); 
            };

            replyFormContainer.appendChild(textarea);
            replyFormContainer.appendChild(submitButton);
            parentFeedbackElement.appendChild(replyFormContainer); 
            textarea.focus();
        }


        handleFeedbackSubmit = (projectId, taskId, textareaElement, feedbackListElement, parentFeedbackId = null) => { 
            const comentario = textareaElement.value.trim(); 
            if (comentario === '') { 
                textareaElement.placeholder = "El comentario no puede estar vacío."; 
                return; 
            } 
            const proyecto = projectData[projectId]; 
            const tarea = proyecto.tareas.find(t => t.id === taskId); 
            if (tarea && currentUser) { 
                const nuevoFeedback = { 
                    id: `fb${Date.now()}`, 
                    usuario: currentUser.nombre, 
                    comentario: comentario, 
                    fecha: new Date().toISOString(), 
                    tipo: currentUser.tipo,
                    replies: [] 
                }; 

                let targetArray;
                if (parentFeedbackId) {
                    const findParentRepliesArray = (feedbacks) => {
                        for (let fb of feedbacks) {
                            if (fb.id === parentFeedbackId) {
                                if (!fb.replies) fb.replies = []; 
                                return fb.replies;
                            }
                            if (fb.replies && fb.replies.length > 0) {
                                const found = findParentRepliesArray(fb.replies);
                                if (found) return found;
                            }
                        }
                        return null;
                    };
                    targetArray = findParentRepliesArray(tarea.feedback);
                } else {
                    targetArray = tarea.feedback;
                }

                if (targetArray) {
                    targetArray.push(nuevoFeedback);
                } else {
                    console.error("No se pudo encontrar el array de feedback/respuestas de destino.");
                    return;
                }
                
                const mainFeedbackListElement = document.getElementById(`feedback-list-${taskId}`);
                if (mainFeedbackListElement) {
                    renderFeedbackList(tarea.feedback, mainFeedbackListElement, taskId);
                }
                
                textareaElement.value = ''; 
                textareaElement.placeholder = parentFeedbackId ? "Escribe tu respuesta..." : "Escribe tu feedback aquí..."; 
                
                const actividad = { 
                    usuario: currentUser.nombre, 
                    accion: parentFeedbackId ? `respondió al feedback en "${tarea.nombre}"` : `comentó en la tarea "${tarea.nombre}"`, 
                    tiempo: new Date().toISOString(),
                    tipo: 'comentario' 
                };
                
                simulateRealtimeUpdate({
                    type: 'new_feedback',
                    projectId: projectId,
                    taskId: taskId,
                    feedback: nuevoFeedback,
                    parentFeedbackId: parentFeedbackId,
                    activity: actividad
                });
            } 
        };
        
        actualizarListaActividadReciente = (actividades) => { 
            if (!recentActivityList) return; 
            recentActivityList.innerHTML = ''; 
            if (actividades && actividades.length > 0) {
                const sortedActivities = [...actividades].sort((a, b) => new Date(b.tiempo) - new Date(a.tiempo));

                sortedActivities.slice(0, 5).forEach(actividad => { 
                    const actividadItem = document.createElement('li'); 
                    actividadItem.classList.add('border-b', 'pb-3', 'last:border-b-0', 'last:pb-0'); 
                    let iconSvg = ''; 
                    if (actividad.tipo === 'tarea') iconSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle inline mr-1 text-green-500" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/></svg>'; 
                    else if (actividad.tipo === 'comentario') iconSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-dots inline mr-1 text-blue-500" viewBox="0 0 16 16"><path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/><path d="M2.165 15.803l.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2z"/></svg>'; 
                    else if (actividad.tipo === 'hito') iconSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-flag-fill inline mr-1 text-purple-500" viewBox="0 0 16 16"><path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.731 0-1.434.246-2.023.502-.613.267-1.293.542-1.968.607A.5.5 0 0 1 2 9.5V1A.5.5 0 0 1 2.5 1h11a.5.5 0 0 1 .278-.085z"/></svg>'; 
                    else if (actividad.tipo === 'archivo') iconSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-paperclip inline mr-1 text-gray-500" viewBox="0 0 16 16"><path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5A.5.5 0 0 1 9 5v7a1.5 1.5 0 0 1-3 0V3z"/></svg>';
                    
                    let tiempoFormateado;
                    const fechaActividad = new Date(actividad.tiempo);
                    const ahora = new Date();
                    const diffMs = ahora - fechaActividad;
                    const diffMins = Math.round(diffMs / 60000);

                    if (diffMins < 1) {
                        tiempoFormateado = 'Ahora mismo';
                    } else if (diffMins < 60) {
                        tiempoFormateado = `Hace ${diffMins} min`;
                    } else if (diffMins < 1440) { 
                        tiempoFormateado = `Hace ${Math.floor(diffMins / 60)}h`;
                    } else {
                        tiempoFormateado = fechaActividad.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
                    }

                    actividadItem.innerHTML = ` <p>${iconSvg}<strong class="font-medium">${actividad.usuario}</strong> ${actividad.accion}.</p> <p class="text-xs mt-1 pl-5">${tiempoFormateado}</p> `; 
                    recentActivityList.appendChild(actividadItem); 
                }); 
            } else { 
                recentActivityList.innerHTML = '<p>No hay actividad reciente para este proyecto.</p>'; 
            } 
        };
        
        function renderAttachments(attachmentsArray, containerElement) {
            containerElement.innerHTML = ''; 
            if (!attachmentsArray || attachmentsArray.length === 0) {
                containerElement.innerHTML = '<li class="text-xs italic">No hay archivos adjuntos.</li>';
                return;
            }
            attachmentsArray.forEach(att => {
                const attItem = document.createElement('li');
                attItem.classList.add('attachment-item');
                attItem.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0l1.414-1.414a.5.5 0 00-.707-.707L9.414 9.172a1 1 0 000 1.414l3 3a1 1 0 001.414 0l.707-.707a4.507 4.507 0 00-6.364-6.364L4.586 10.172a6.507 6.507 0 009.193 9.193l4.242-4.243a.5.5 0 10-.707-.707L13.071 18.66A5.507 5.507 0 015.32 10.91l3.535-3.536a3 3 0 014.243 0z" clip-rule="evenodd" />
                    </svg>
                    <a href="${att.url}" target="_blank" title="Subido por ${att.user} el ${new Date(att.date).toLocaleDateString()}">${att.name}</a>
                `;
                containerElement.appendChild(attItem);
            });
        }

        function handleFileUpload(projectId, taskId, fileInput, attachmentsContainer) {
            if (!fileInput.files || fileInput.files.length === 0) {
                console.log("Ningún archivo seleccionado");
                return;
            }
            const file = fileInput.files[0];
            console.log(`Simulando subida de: ${file.name} para tarea ${taskId} en proyecto ${projectId}`);

            const proyecto = projectData[projectId];
            const tarea = proyecto.tareas.find(t => t.id === taskId);

            if (tarea && currentUser) {
                const nuevoAdjunto = {
                    id: `att${Date.now()}`,
                    name: file.name,
                    url: '#', 
                    user: currentUser.nombre,
                    date: new Date().toISOString()
                };
                if (!tarea.attachments) tarea.attachments = [];
                tarea.attachments.push(nuevoAdjunto);
                
                renderAttachments(tarea.attachments, attachmentsContainer); 
                fileInput.value = ''; 

                const actividad = {
                    usuario: currentUser.nombre,
                    accion: `adjuntó el archivo "${file.name}" a la tarea "${tarea.nombre}"`,
                    tiempo: new Date().toISOString(),
                    tipo: 'archivo'
                };
                simulateRealtimeUpdate({
                    type: 'new_attachment',
                    projectId: projectId,
                    taskId: taskId,
                    attachment: nuevoAdjunto,
                    activity: actividad
                });
            }
        }


        actualizarDashboard = (projectId) => { if (!projectData[projectId]) { console.error("Proyecto no encontrado:", projectId); return; } const proyecto = projectData[projectId]; const tareasDelProyecto = proyecto.tareas || []; const analisisProgreso = analizarProgreso(tareasDelProyecto); const barraProgreso = document.getElementById('barra-progreso'); const textoProgreso = document.getElementById('texto-progreso'); const chartType = chartTypeSelect ? chartTypeSelect.value : 'lista'; const progressFormat = progressFormatSelect ? progressFormatSelect.value : 'porcentaje'; if (projectSummaryText && proyecto.resumen) { projectSummaryText.textContent = proyecto.descripcion || "Este proyecto busca alcanzar sus objetivos eficientemente."; if (projectSummaryDetailsContainer) { projectSummaryDetailsContainer.innerHTML = ` <div> <p><strong class="font-medium">Estado Actual:</strong> ${proyecto.resumen.estado || 'N/A'}</p> <p><strong class="font-medium">Fecha de Inicio:</strong> ${proyecto.resumen.fechaInicio || 'N/A'}</p> <p><strong class="font-medium">Presupuesto:</strong> ${proyecto.resumen.presupuesto ? '$' + proyecto.resumen.presupuesto.toLocaleString() : 'N/A'}</p> </div> <div> <p><strong class="font-medium">Fecha Estimada de Fin:</strong> ${proyecto.resumen.fechaFinEstimada || 'N/A'}</p> <p><strong class="font-medium">Equipo:</strong> ${(proyecto.resumen.equipo || []).join(', ') || 'N/A'}</p> <p><strong class="font-medium">Tecnologías:</strong> ${(proyecto.resumen.tecnologias || []).join(', ') || 'N/A'}</p> </div>`; } } else if (projectSummaryText) { projectSummaryText.textContent = "Resumen no disponible para este proyecto."; if(projectSummaryDetailsContainer) projectSummaryDetailsContainer.innerHTML = ""; } actualizarListaActividadReciente(proyecto.actividadReciente); if (barraProgreso && textoProgreso) { barraProgreso.style.width = `${analisisProgreso.progresoPromedio.toFixed(0)}%`; textoProgreso.textContent = progressFormat === 'porcentaje' ? `${analisisProgreso.progresoPromedio.toFixed(0)}% Completado` : `${(analisisProgreso.progresoPromedio * tareasDelProyecto.length / 100).toFixed(0)} de ${tareasDelProyecto.length} hitos`; } if (projectTimeline) { projectTimeline.innerHTML = ''; const metricasProyecto = proyecto.metricas || []; const tareasFiltradas = tareasDelProyecto.filter(tarea => { if (metricasProyecto.length === 0) return true; return metricasProyecto.some(metrica => { if (metrica === 'progreso' && tarea.progreso !== undefined) return true; if (metrica === 'tareasCompletadas' && tarea.progreso === 100) return true; if (metrica === 'tareasPendientes' && tarea.progreso < 100) return true; if (metrica === 'tiempoRestante' && tarea.fechaFinEstimada) return true; if (metrica === 'costo' && tarea.costo !== undefined) return true; if (metrica === 'ubicacion' && tarea.ubicacion) return true; return false; }); }); if (tareasFiltradas.length === 0 && chartType !== 'tabla') { projectTimeline.innerHTML = '<p class="p-4">No hay hitos que coincidan con los criterios para este proyecto.</p>'; } else if (tareasFiltradas.length > 0 && chartType === 'tabla') { projectTimeline.innerHTML = ` <div class="overflow-x-auto"> <table class="min-w-full divide-y"> <thead class="bg-gray-50"> <tr> <th scope="col" class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Hito</th> <th scope="col" class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Progreso</th> <th scope="col" class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Fin Estimado</th> ${metricasProyecto.includes('costo') ? '<th scope="col" class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Costo</th>' : ''} ${metricasProyecto.includes('tiempoRestante') ? '<th scope="col" class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Tiempo Rest.</th>' : ''} ${metricasProyecto.includes('ubicacion') ? '<th scope="col" class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Ubicación</th>' : ''} <th scope="col" class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Detalles</th> </tr> </thead> <tbody class="bg-white divide-y" id="tabla-tareas-body"></tbody> </table> </div>`; } else if (tareasFiltradas.length === 0 && chartType === 'tabla') { projectTimeline.innerHTML = '<p class="p-4">No hay hitos para mostrar en la tabla.</p>'; } tareasFiltradas.forEach(tarea => { let estadoIconoSvg = '', estadoClaseCss = '', estadoTextoAlt = ''; if (tarea.progreso === 100) { estadoClaseCss = 'completed'; estadoTextoAlt = 'Completado'; estadoIconoSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`; } else if (tarea.progreso > 0) { estadoClaseCss = 'in-progress'; estadoTextoAlt = 'En Progreso'; estadoIconoSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>`; } else { estadoClaseCss = 'pending'; estadoTextoAlt = 'Pendiente'; estadoIconoSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`; } let itemContentHtml = ''; let detailsContent = `<p>${(tarea.detalles || 'No hay detalles disponibles.').replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>`; const feedbackListId = `feedback-list-${tarea.id}`; const feedbackTextareaId = `feedback-textarea-${tarea.id}`; const feedbackButtonId = `feedback-button-${tarea.id}`; const attachmentsListId = `attachments-list-${tarea.id}`; const attachmentInputId = `attachment-input-${tarea.id}`; const attachmentButtonId = `attachment-button-${tarea.id}`; const aiTaskSuggestionsButtonId = `ai-task-suggestions-button-${tarea.id}`; const aiTaskSuggestionsOutputId = `ai-task-suggestions-output-${tarea.id}`; const aiTaskSuggestionsLoaderId = `ai-task-suggestions-loader-${tarea.id}`; const attachmentsHtml = ` <div class="task-attachments-section"> <h5>Archivos Adjuntos</h5> <ul class="attachment-list" id="${attachmentsListId}"></ul> <div class="attachment-form"> <input type="file" id="${attachmentInputId}" class="text-xs"> <button id="${attachmentButtonId}">Adjuntar</button> </div> </div>`; const feedbackHtml = ` <div class="task-feedback-section"> <h5>Feedback sobre esta Tarea</h5> <ul class="feedback-list" id="${feedbackListId}"></ul> <div class="feedback-form"> <textarea id="${feedbackTextareaId}" rows="2" placeholder="Escribe tu feedback aquí..."></textarea> <button id="${feedbackButtonId}">Enviar Feedback</button> </div> </div>`; const aiTaskSuggestionsHtml = ` <div class="task-ai-suggestions-section mt-4"> <button id="${aiTaskSuggestionsButtonId}" class="btn-ai-feature text-xs"> <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-stars" viewBox="0 0 16 16"><path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.73 1.73 0 0 0 4.593 5.31l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.31A1.73 1.73 0 0 0 2.31 4.213l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.73 1.73 0 0 0 3.407 2.31zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z"/></svg> Sugerir Pasos ✨ </button> <div id="${aiTaskSuggestionsLoaderId}" class="loader hidden mt-1" style="width:15px; height:15px; margin-left: 5px;"></div> <div id="${aiTaskSuggestionsOutputId}" class="ai-task-suggestions-container hidden"></div> </div>`; const fullDetailsAndFeedbackHtml = `<div class="timeline-details-container"> ${detailsContent} ${attachmentsHtml} ${feedbackHtml} ${aiTaskSuggestionsHtml} </div>`; switch (chartType) { case 'lista': itemContentHtml = ` <h4 class="timeline-title">${tarea.nombre}</h4> <p class="timeline-summary">Progreso: ${progressFormat === 'porcentaje' ? tarea.progreso + '%' : tarea.progreso + ' de 100'}</p> ${fullDetailsAndFeedbackHtml} `; break; case 'barra': itemContentHtml = ` <h4 class="timeline-title">${tarea.nombre}</h4> <div class="w-full rounded-full h-2.5 mb-1 mt-1 progress-bar-track-ios"><div class="progress-bar-fill-ios h-2.5 rounded-full transition-all duration-300 ease-in-out" style="width: ${tarea.progreso}%"></div></div> <p class="timeline-summary text-xs">Progreso: ${progressFormat === 'porcentaje' ? tarea.progreso + '%' : tarea.progreso + ' de 100'}</p> ${fullDetailsAndFeedbackHtml} `; break; case 'circular': itemContentHtml = ` <h4 class="timeline-title">${tarea.nombre}</h4> <div class="flex items-center gap-3 my-2"> <div class="relative w-12 h-12"> <svg class="w-full h-full" viewBox="0 0 36 36"><path class="progress-bar-track-ios" stroke-width="3" fill="none" stroke="currentColor" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"></path><path class="progress-bar-fill-ios transition-all duration-500 ease-out" stroke-width="3" fill="none" stroke="var(--progress-fill)" stroke-dasharray="${tarea.progreso}, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"></path></svg> <div class="absolute inset-0 flex items-center justify-center text-xs font-semibold">${tarea.progreso}%</div> </div> <p class="timeline-summary">Progreso: ${progressFormat === 'porcentaje' ? tarea.progreso + '%' : tarea.progreso + ' de 100'}</p> </div> ${fullDetailsAndFeedbackHtml} `; break; case 'tabla': const tablaBody = document.getElementById('tabla-tareas-body'); if (tablaBody) { const fila = tablaBody.insertRow(); fila.classList.add('hover:bg-gray-50'); fila.innerHTML = ` <td class="px-4 py-3 whitespace-nowrap text-sm font-medium">${tarea.nombre}</td> <td class="px-4 py-3 whitespace-nowrap text-sm"><div class="w-full rounded-full h-2.5 progress-bar-track-ios"><div class="progress-bar-fill-ios h-2.5 rounded-full" style="width: ${tarea.progreso}%"></div></div><span class="text-xs">${progressFormat === 'porcentaje' ? tarea.progreso + '%' : tarea.progreso + ' de 100'}</span></td> <td class="px-4 py-3 whitespace-nowrap text-sm">${tarea.fechaFinEstimada || 'N/A'}</td> ${metricasProyecto.includes('costo') ? `<td class="px-4 py-3 whitespace-nowrap text-sm">${tarea.costo !== undefined ? '$' + tarea.costo.toLocaleString() : 'N/A'}</td>` : ''} ${metricasProyecto.includes('tiempoRestante') ? `<td class="px-4 py-3 whitespace-nowrap text-sm">${calcularTiempoRestante(tarea.fechaFinEstimada)}</td>` : ''} ${metricasProyecto.includes('ubicacion') ? `<td class="px-4 py-3 whitespace-nowrap text-sm">${tarea.ubicacion || 'N/A'}</td>` : ''} <td class="px-4 py-3 text-sm">${tarea.detalles || 'No hay detalles.'}</td>`; } return; case 'tarjeta': itemContentHtml = ` <div class="task-card-item bg-white rounded-lg shadow p-4 mb-3 border hover:shadow-md transition-shadow"> <h4 class="text-md font-semibold">${tarea.nombre}</h4> <div class="w-full rounded-full h-2 my-1.5 progress-bar-track-ios"><div class="progress-bar-fill-ios h-2 rounded-full" style="width: ${tarea.progreso}%"></div></div> <p class="text-xs">Progreso: ${progressFormat === 'porcentaje' ? tarea.progreso + '%' : tarea.progreso + ' de 100'}</p> <p class="text-xs">Fin Estimado: ${tarea.fechaFinEstimada || 'N/A'}</p> ${metricasProyecto.includes('costo') && tarea.costo !== undefined ? `<p class="text-xs">Costo: $${tarea.costo.toLocaleString()}</p>` : ''} ${metricasProyecto.includes('tiempoRestante') ? `<p class="text-xs">Tiempo Restante: ${calcularTiempoRestante(tarea.fechaFinEstimada)}</p>` : ''} ${metricasProyecto.includes('ubicacion') && tarea.ubicacion ? `<p class="text-xs">Ubicación: ${tarea.ubicacion}</p>` : ''} ${fullDetailsAndFeedbackHtml} </div>`; break; case 'calendario': itemContentHtml = ` <div class="calendario-item-container border p-3 rounded-md mb-2 bg-indigo-50 border-indigo-200 shadow-sm relative"> <h4 class="timeline-title text-sm font-semibold">${tarea.nombre} (${tarea.progreso}%)</h4> <p class="timeline-summary text-xs">Inicio: ${tarea.fechaInicio || 'N/A'} &bull; Fin Estimado: ${tarea.fechaFinEstimada || 'N/A'}</p> ${fullDetailsAndFeedbackHtml} <div class="expand-icon" role="button" aria-expanded="false" aria-label="Expandir detalles"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" /></svg> </div> </div>`; break; default: itemContentHtml = `<p>Vista no soportada: ${chartType}</p>`; } const tareaItem = document.createElement('li'); if (chartType !== 'tabla' && chartType !== 'tarjeta' && chartType !== 'calendario') { tareaItem.classList.add('timeline-item', estadoClaseCss); tareaItem.innerHTML = ` <div class="timeline-icon ${estadoClaseCss}" aria-label="${estadoTextoAlt}">${estadoIconoSvg}</div> <div class="timeline-content">${itemContentHtml}</div> <div class="expand-icon" role="button" aria-expanded="false" aria-label="Expandir detalles"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" /></svg> </div>`; } else if (chartType === 'tarjeta' || chartType === 'calendario') { tareaItem.classList.add('list-none'); tareaItem.innerHTML = itemContentHtml; if (chartType === 'tarjeta') { const expandButton = document.createElement('button'); expandButton.classList.add('text-xs', 'link-ios', 'hover:underline', 'mt-2', 'expand-details-button', 'font-medium'); expandButton.textContent = 'Ver detalles y Feedback'; expandButton.setAttribute('aria-expanded', 'false'); const cardDiv = tareaItem.querySelector('.task-card-item'); if (cardDiv) { const detailsContainer = cardDiv.querySelector('.timeline-details-container'); if(detailsContainer) cardDiv.insertBefore(expandButton, detailsContainer); else cardDiv.appendChild(expandButton); } } } projectTimeline.appendChild(tareaItem); const feedbackListElement = document.getElementById(feedbackListId); const feedbackTextareaElement = document.getElementById(feedbackTextareaId); const feedbackButtonElement = document.getElementById(feedbackButtonId); if (feedbackListElement) renderFeedbackList(tarea.feedback || [], feedbackListElement, tarea.id); 
            if (feedbackButtonElement && feedbackTextareaElement && feedbackListElement) { 
                feedbackButtonElement.addEventListener('click', () => { 
                    handleFeedbackSubmit(projectId, tarea.id, feedbackTextareaElement, feedbackListElement); 
                }); 
            }
            const attachmentsListElement = document.getElementById(attachmentsListId);
            const attachmentInputElement = document.getElementById(attachmentInputId);
            const attachmentButtonElement = document.getElementById(attachmentButtonId);
            if (attachmentsListElement) renderAttachments(tarea.attachments || [], attachmentsListElement);
            if (attachmentButtonElement && attachmentInputElement && attachmentsListElement) {
                attachmentButtonElement.addEventListener('click', () => {
                    handleFileUpload(projectId, tarea.id, attachmentInputElement, attachmentsListElement);
                });
            }
            const aiTaskSuggestionsBtn = document.getElementById(aiTaskSuggestionsButtonId);
            if (aiTaskSuggestionsBtn) {
                aiTaskSuggestionsBtn.addEventListener('click', () => generateAiTaskSuggestions(projectId, tarea.id));
            }
         }); 
        } 
        attachExpandCollapseListeners(); 
        };

        attachExpandCollapseListeners = () => {
            const itemsToToggle = document.querySelectorAll('.timeline-item .expand-icon, .expand-details-button, .calendario-item-container .expand-icon');

            itemsToToggle.forEach(toggler => {
                let detailsContainer;
                let parentElementToToggleClass;

                if (toggler.classList.contains('expand-details-button')) { 
                    parentElementToToggleClass = toggler.closest('.task-card-item');
                } else if (toggler.closest('.timeline-item')) { 
                    parentElementToToggleClass = toggler.closest('.timeline-item');
                } else if (toggler.closest('.calendario-item-container')) { 
                    parentElementToToggleClass = toggler.closest('.calendario-item-container');
                }

                if (parentElementToToggleClass) {
                    detailsContainer = parentElementToToggleClass.querySelector('.timeline-details-container');
                }

                if (detailsContainer && parentElementToToggleClass) {
                    const newToggler = toggler.cloneNode(true);
                    toggler.parentNode.replaceChild(newToggler, toggler);

                    newToggler.addEventListener('click', (event) => {
                        event.stopPropagation();
                        const isExpanded = parentElementToToggleClass.classList.toggle('expanded');
                        detailsContainer.style.display = isExpanded ? 'block' : 'none';
                        newToggler.setAttribute('aria-expanded', isExpanded);

                        if (newToggler.classList.contains('expand-details-button')) { 
                            newToggler.textContent = isExpanded ? 'Ocultar detalles y Feedback' : 'Ver detalles y Feedback';
                        } else { 
                            const svg = newToggler.querySelector('svg');
                            if (svg) svg.style.transform = isExpanded ? 'rotate(180deg)' : 'rotate(0deg)';
                        }
                    });
                }
            });
        };
        calcularTiempoRestante = (fechaFin) => { if (!fechaFin) return 'N/A'; const ahora = new Date(); const fin = new Date(fechaFin); const diferencia = fin.getTime() - ahora.getTime(); if (diferencia < 0) return 'Plazo vencido'; const dias = Math.ceil(diferencia / (1000 * 60 * 60 * 24)); if (dias === 0 && ahora.toDateString() === fin.toDateString()) return 'Hoy'; if (dias === 1) return '1 día'; return `${dias} días`; };
        checkLoginStatus = () => {
            if (localStorage.getItem('loggedIn') === 'true') {
                const storedUser = localStorage.getItem('currentUser');
                if (storedUser) {
                    currentUser = JSON.parse(storedUser);
                    if (!currentUser.email) {
                        if (currentUser.nombre === "Cliente Demo") currentUser.email = "demo@example.com";
                        else if (currentUser.nombre === "Ana Pérez (Dev)") currentUser.email = "dev@example.com";
                        else if (currentUser.nombre === "Usuario Google") currentUser.email = "usuario.google@example.com";
                        else currentUser.email = "usuario@example.com";
                        localStorage.setItem('currentUser', JSON.stringify(currentUser));
                    }
                } else {
                    currentUser = { nombre: "Cliente Demo", tipo: "cliente", email: "demo@example.com" };
                    localStorage.setItem('currentUser', JSON.stringify(currentUser));
                }
                showMainContent();
            } else {
                showLogin();
            }
        };
        
        function generateProjectReport(projectId, format) {
            if (!selectedProjectId) {
                alert("Por favor, selecciona un proyecto primero.");
                return;
            }
            const project = projectData[selectedProjectId];
            if (!project) {
                alert("No se encontraron datos para el proyecto seleccionado.");
                return;
            }

            const { nombre, descripcion, resumen, tareas, actividadReciente } = project;
            const today = new Date().toLocaleDateString('es-ES');

            if (format === 'pdf') {
                const { jsPDF } = window.jspdf;
                const doc = new jsPDF();
                let yPos = 15;
                const lineHeight = 7;
                const margin = 15;
                const pageWidth = doc.internal.pageSize.getWidth();
                const usableWidth = pageWidth - 2 * margin;

                doc.setFontSize(18);
                doc.text(`Reporte del Proyecto: ${nombre}`, margin, yPos);
                yPos += lineHeight * 2;

                doc.setFontSize(10);
                doc.text(`Fecha del Reporte: ${today}`, margin, yPos);
                yPos += lineHeight * 1.5;

                doc.setFontSize(12);
                doc.text("Resumen del Proyecto:", margin, yPos);
                yPos += lineHeight;
                doc.setFontSize(10);
                doc.text(doc.splitTextToSize(descripcion || "N/A", usableWidth), margin, yPos);
                yPos += doc.getTextDimensions(doc.splitTextToSize(descripcion || "N/A", usableWidth)).h + lineHeight;
                
                doc.text(`Estado: ${resumen.estado || 'N/A'}`, margin, yPos); yPos += lineHeight;
                doc.text(`Fecha de Inicio: ${resumen.fechaInicio || 'N/A'}`, margin, yPos); yPos += lineHeight;
                doc.text(`Fecha Estimada de Fin: ${resumen.fechaFinEstimada || 'N/A'}`, margin, yPos); yPos += lineHeight;
                yPos += lineHeight * 0.5;

                doc.setFontSize(12);
                doc.text("Hitos Clave:", margin, yPos);
                yPos += lineHeight;
                doc.setFontSize(10);
                (tareas || []).forEach(tarea => {
                    if (yPos > doc.internal.pageSize.getHeight() - 20) { doc.addPage(); yPos = margin; }
                    doc.text(`- ${tarea.nombre}: ${tarea.progreso}% (Fin Est.: ${tarea.fechaFinEstimada || 'N/A'})`, margin + 5, yPos);
                    yPos += lineHeight;
                });
                yPos += lineHeight * 0.5;

                doc.setFontSize(12);
                doc.text("Actividad Reciente (Últimas 5):", margin, yPos);
                yPos += lineHeight;
                doc.setFontSize(10);
                [...(actividadReciente || [])].sort((a,b) => new Date(b.tiempo) - new Date(a.tiempo)).slice(0,5).forEach(act => {
                    if (yPos > doc.internal.pageSize.getHeight() - 20) { doc.addPage(); yPos = margin; }
                    const tiempoAct = new Date(act.tiempo).toLocaleString('es-ES');
                    doc.text(`- ${tiempoAct}: ${act.usuario} - ${act.accion}`, margin + 5, yPos);
                    yPos += lineHeight;
                });
                yPos += lineHeight * 0.5;
                
                doc.setFontSize(12);
                doc.text("Feedback Reciente (Comentarios Principales):", margin, yPos);
                yPos += lineHeight;
                doc.setFontSize(10);
                (tareas || []).forEach(tarea => {
                    (tarea.feedback || []).forEach(fb => {
                         if (yPos > doc.internal.pageSize.getHeight() - 20) { doc.addPage(); yPos = margin; }
                        doc.text(`Tarea: ${tarea.nombre}`, margin + 5, yPos); yPos += lineHeight * 0.8;
                        doc.text(`  ${fb.usuario} (${new Date(fb.fecha).toLocaleDateString('es-ES')}): ${fb.comentario.substring(0,100)}${fb.comentario.length > 100 ? '...' : ''}`, margin + 10, yPos);
                        yPos += lineHeight;
                    });
                });


                doc.save(`Reporte_${nombre.replace(/\s/g, '_')}_${today}.pdf`);

            } else if (format === 'csv') {
                let csvContent = "data:text/csv;charset=utf-8,";
                csvContent += "Tipo,Nombre/Usuario,Detalle 1,Detalle 2,Detalle 3\r\n"; 

                (tareas || []).forEach(tarea => {
                    csvContent += `Hito,"${tarea.nombre}","${tarea.progreso}%","Fin Est.: ${tarea.fechaFinEstimada || 'N/A'}","Costo: ${tarea.costo || 'N/A'}"\r\n`;
                });
                csvContent += "\r\n"; 

                csvContent += "Actividad,Usuario,Acción,Tiempo\r\n";
                 [...(actividadReciente || [])].sort((a,b) => new Date(b.tiempo) - new Date(a.tiempo)).slice(0,10).forEach(act => {
                    csvContent += `Actividad,"${act.usuario}","${act.accion}","${new Date(act.tiempo).toLocaleString('es-ES')}"\r\n`;
                });
                csvContent += "\r\n";

                csvContent += "Feedback,Tarea,Usuario,Comentario,Fecha\r\n";
                (tareas || []).forEach(tarea => {
                    (tarea.feedback || []).forEach(fb => {
                        const comentarioLimpio = fb.comentario.replace(/"/g, '""').replace(/\n/g, ' '); 
                        csvContent += `Feedback,"${tarea.nombre}","${fb.usuario}","${comentarioLimpio}","${new Date(fb.fecha).toLocaleString('es-ES')}"\r\n`;
                    });
                });


                const encodedUri = encodeURI(csvContent);
                const link = document.createElement("a");
                link.setAttribute("href", encodedUri);
                link.setAttribute("download", `Reporte_${nombre.replace(/\s/g, '_')}_${today}.csv`);
                document.body.appendChild(link); 
                link.click();
                document.body.removeChild(link);
            }
        }

        if (exportPdfButton) {
            exportPdfButton.addEventListener('click', () => generateProjectReport(selectedProjectId, 'pdf'));
        }
        if (exportCsvButton) {
            exportCsvButton.addEventListener('click', () => generateProjectReport(selectedProjectId, 'csv'));
        }

        async function callGeminiAPI(promptText) {
            const apiKey = "TU_API_KEY_AQUI"; 
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
            
            const payload = {
                contents: [{
                    parts: [{ text: promptText }]
                }]
            };

            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    console.error("Error en API Gemini:", response.status, errorData);
                    return `Error de API: ${errorData?.error?.message || response.statusText}`;
                }
                const result = await response.json();
                if (result.candidates && result.candidates.length > 0 &&
                    result.candidates[0].content && result.candidates[0].content.parts &&
                    result.candidates[0].content.parts.length > 0) {
                    return result.candidates[0].content.parts[0].text;
                } else {
                    console.error("Respuesta inesperada de API Gemini:", result);
                    return "No se pudo obtener una respuesta válida de la IA.";
                }
            } catch (error) {
                console.error("Error al llamar a la API Gemini:", error);
                return "Error de conexión al intentar contactar la IA.";
            }
        }

        if (generateAiSummaryButton) {
            generateAiSummaryButton.addEventListener('click', async () => {
                if (!selectedProjectId) {
                    aiProjectSummaryOutput.textContent = "Por favor, selecciona un proyecto primero.";
                    aiProjectSummaryOutput.classList.remove('hidden');
                    return;
                }
                const project = projectData[selectedProjectId];
                if (!project) {
                    aiProjectSummaryOutput.textContent = "No se encontraron datos para el proyecto seleccionado.";
                    aiProjectSummaryOutput.classList.remove('hidden');
                    return;
                }

                aiSummaryLoader.classList.remove('hidden');
                aiProjectSummaryOutput.classList.add('hidden');
                aiProjectSummaryOutput.innerHTML = ''; 

                const prompt = `Eres un asistente de gestión de proyectos. Genera un resumen conciso y profesional para el siguiente proyecto:
Nombre del Proyecto: ${project.nombre}
Cliente: ${project.cliente}
Descripción: ${project.descripcion}
Estado Actual: ${project.resumen.estado}
Fecha de Inicio: ${project.resumen.fechaInicio}
Fecha Estimada de Fin: ${project.resumen.fechaFinEstimada}
Equipo Principal: ${project.resumen.equipo.join(', ')}
Tecnologías Clave: ${project.resumen.tecnologias.join(', ')}

El resumen debe ser breve, destacar los puntos más importantes y ser adecuado para un informe ejecutivo.`;

                const summary = await callGeminiAPI(prompt);
                aiProjectSummaryOutput.innerHTML = `<p><strong>Resumen Generado por IA:</strong></p><p>${summary.replace(/\n/g, '<br>')}</p>`;
                aiProjectSummaryOutput.classList.remove('hidden');
                aiSummaryLoader.classList.add('hidden');
                applyFlashEffect(aiProjectSummaryOutput);
            });
        }

        async function generateAiTaskSuggestions(projectId, taskId) {
            const project = projectData[projectId];
            const task = project.tareas.find(t => t.id === taskId);
            if (!task) return;

            const suggestionsOutput = document.getElementById(`ai-task-suggestions-output-${taskId}`);
            const suggestionsLoader = document.getElementById(`ai-task-suggestions-loader-${taskId}`);
            
            if (suggestionsLoader) suggestionsLoader.classList.remove('hidden');
            if (suggestionsOutput) {
                suggestionsOutput.classList.add('hidden');
                suggestionsOutput.innerHTML = '';
            }

            const prompt = `Eres un asistente de gestión de proyectos experimentado. Para la siguiente tarea/hito, sugiere 3-4 próximos pasos concretos y accionables, o posibles bloqueos a considerar:
Nombre de la Tarea: ${task.nombre}
Descripción: ${task.detalles}
Progreso Actual: ${task.progreso}%
Fecha de Inicio: ${task.fechaInicio}
Fecha Estimada de Fin: ${task.fechaFinEstimada}

Proporciona las sugerencias en una lista clara y concisa.`;

            const suggestions = await callGeminiAPI(prompt);
            
            if (suggestionsOutput) {
                suggestionsOutput.innerHTML = `<p><strong>Sugerencias de la IA:</strong></p><p>${suggestions.replace(/\n/g, '<br>')}</p>`;
                suggestionsOutput.classList.remove('hidden');
                applyFlashEffect(suggestionsOutput);
            }
            if (suggestionsLoader) suggestionsLoader.classList.add('hidden');
        }

        if (chatbotFab && chatbotPanel && closeChatbotButton && chatbotMessages && chatbotInput && chatbotSendButton) {
            chatbotFab.addEventListener('click', () => {
                chatbotPanel.classList.toggle('open');
                if (chatbotPanel.classList.contains('open')) {
                    chatbotFab.classList.add('chatbot-fab-hidden'); 
                    chatbotInput.focus();
                    if (chatbotMessages.children.length === 0) {
                        displayChatMessage("¡Hola! Soy tu asistente de proyectos. ¿En qué puedo ayudarte hoy sobre los proyectos cargados?", 'ai');
                    }
                } else {
                    chatbotFab.classList.remove('chatbot-fab-hidden'); 
                }
            });
            closeChatbotButton.addEventListener('click', () => {
                chatbotPanel.classList.remove('open');
                chatbotFab.classList.remove('chatbot-fab-hidden'); 
            });

            chatbotSendButton.addEventListener('click', handleChatbotSendMessage);
            chatbotInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    handleChatbotSendMessage();
                }
            });
        }

        function displayChatMessage(message, sender) {
            const messageElement = document.createElement('div');
            messageElement.classList.add('chat-bubble', sender === 'user' ? 'user-bubble' : 'ai-bubble');
            
            if (sender === 'ai' && message === 'loading') {
                messageElement.classList.add('loading');
                messageElement.innerHTML = '<div class="dot-loader"><div></div><div></div><div></div></div>';
            } else {
                messageElement.innerHTML = message.replace(/\n/g, '<br>');
            }
            
            chatbotMessages.appendChild(messageElement);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight; 
        }

        async function handleChatbotSendMessage() {
            const userInput = chatbotInput.value.trim();
            if (userInput === '') return;

            displayChatMessage(userInput, 'user');
            chatbotInput.value = '';
            displayChatMessage('loading', 'ai'); 

            let projectContext = "Aquí está la información actual de los proyectos:\n\n";
            Object.values(projectData).forEach(proj => {
                projectContext += `--- Proyecto: ${proj.nombre} ---\n`;
                projectContext += `Cliente: ${proj.cliente}\n`;
                projectContext += `Descripción: ${proj.descripcion}\n`;
                projectContext += `Estado Actual: ${proj.resumen.estado}\n`;
                projectContext += `Fecha de Inicio: ${proj.resumen.fechaInicio}, Fecha Estimada de Fin: ${proj.resumen.fechaFinEstimada}\n`;
                if (proj.resumen.equipo && proj.resumen.equipo.length > 0) {
                     projectContext += `Equipo: ${proj.resumen.equipo.join(', ')}\n`;
                }
                if (proj.tareas && proj.tareas.length > 0) {
                    projectContext += "Hitos Principales:\n";
                    proj.tareas.forEach(t => {
                        projectContext += `- ${t.nombre} (Progreso: ${t.progreso}%)\n`;
                    });
                }
                projectContext += "\n";
            });

            const fullPrompt = `Eres un asistente virtual amigable y profesional para una plataforma de gestión de proyectos. Tu objetivo es responder preguntas sobre los proyectos basándote ÚNICAMENTE en la información que te proporciono a continuación. Si la pregunta no se puede responder con esta información, indica amablemente que no tienes esa información específica o pide más detalles. Sé conciso. No inventes información que no esté presente.

Información de los Proyectos:
${projectContext}

Pregunta del usuario: "${userInput}"

Respuesta:`;
            
            const aiResponse = await callGeminiAPI(fullPrompt);

            const loadingBubble = chatbotMessages.querySelector('.ai-bubble.loading');
            if (loadingBubble) {
                loadingBubble.remove();
            }
            displayChatMessage(aiResponse, 'ai');
        }


        if (savePreferencesButton && savePreferencesFeedback) { 
            savePreferencesButton.addEventListener('click', () => { 
                const originalButtonText = savePreferencesButton.textContent; 
                savePreferencesButton.textContent = 'Guardando...'; 
                savePreferencesButton.disabled = true; 
                
                const emailPref = prefEmailCheckbox ? prefEmailCheckbox.checked : false;
                const weeklySummaryPref = prefWeeklySummaryCheckbox ? prefWeeklySummaryCheckbox.checked : false;
                const milestonePref = prefMilestoneCheckbox ? prefMilestoneCheckbox.checked : false;
                const majorUpdatesPref = prefMajorUpdatesCheckbox ? prefMajorUpdatesCheckbox.checked : false;


                console.log('Preferencias de Notificación:', {
                    email: emailPref,
                    weeklySummary: weeklySummaryPref,
                    milestones: milestonePref,
                    majorUpdates: majorUpdatesPref
                });
                
                setTimeout(() => { 
                    savePreferencesFeedback.textContent = 'Preferencias guardadas con éxito.'; 
                    savePreferencesFeedback.classList.remove('opacity-0'); 
                    savePreferencesFeedback.classList.add('text-green-600'); 
                    savePreferencesFeedback.style.opacity = '1'; 
                    savePreferencesButton.textContent = originalButtonText; 
                    savePreferencesButton.disabled = false; 
                    setTimeout(() => { 
                        savePreferencesFeedback.style.opacity = '0'; 
                        setTimeout(() => { 
                            if(savePreferencesFeedback.textContent === 'Preferencias guardadas con éxito.'){ 
                                savePreferencesFeedback.textContent = ''; 
                                savePreferencesFeedback.classList.remove('text-green-600'); 
                            } 
                        }, 300); 
                    }, 3000); 
                }, 700); 
            }); 
        }
        if (updateVisualizationButton) { updateVisualizationButton.addEventListener('click', () => { if (selectedProjectId) { updateVisualizationButton.disabled = true; updateVisualizationButton.textContent = 'Actualizando...'; actualizarDashboardConFeedback(selectedProjectId, true); } else { if (errorMessage) { errorMessage.textContent = 'Por favor, selecciona un proyecto para actualizar la visualización.'; errorMessage.classList.remove('hidden'); setTimeout(() => { errorMessage.classList.add('hidden'); }, 3000); } } }); }

        // --- INICIO LÓGICA DEL TOUR ---
        function initializeAppTour() {
            if (typeof Shepherd === 'undefined') {
                console.error("Shepherd.js no está cargado. El tour no funcionará.");
                return null;
            }

            const tour = new Shepherd.Tour({
                defaultStepOptions: {
                    cancelIcon: {
                        enabled: true,
                        label: 'Cerrar tour'
                    },
                    classes: 'shepherd-custom-theme', 
                    scrollTo: { behavior: 'smooth', block: 'center' }
                },
                useModalOverlay: true
            });

            tour.addStep({
                id: 'step-welcome',
                title: '¡Bienvenido/a!',
                text: 'Este es un rápido recorrido por las funciones principales de la plataforma. Haz clic en "Siguiente" para comenzar.',
                buttons: [
                    { action: tour.next, text: 'Siguiente &rarr;' }
                ]
            });

            tour.addStep({
                id: 'step-sidebar',
                title: 'Barra Lateral de Navegación',
                text: 'Aquí encontrarás tu información de usuario, el selector de tema, y la lista de tus proyectos. Haz clic en un proyecto para ver sus detalles.',
                attachTo: { element: '#sidebar', on: 'right' },
                buttons: [
                    { action: tour.back, classes: 'shepherd-button-secondary', text: '&larr; Atrás' },
                    { action: tour.next, text: 'Siguiente &rarr;' }
                ]
            });
             tour.addStep({
                id: 'step-project-title-header',
                title: 'Información del Proyecto',
                text: 'Una vez que seleccionas un proyecto de la lista, su nombre y descripción principal aparecerán aquí.',
                attachTo: { element: '#dashboard-content header > div > div:first-child', on: 'bottom' },
                buttons: [
                    { action: tour.back, classes: 'shepherd-button-secondary', text: '&larr; Atrás' },
                    { action: tour.next, text: 'Siguiente &rarr;' }
                ]
            });


            tour.addStep({
                id: 'step-project-summary',
                title: 'Resumen del Proyecto',
                text: 'Esta tarjeta muestra un resumen detallado del proyecto seleccionado, incluyendo su estado, fechas, equipo y tecnologías. También puedes generar un resumen con IA.',
                attachTo: { element: '#project-summary-card', on: 'bottom' },
                buttons: [
                    { action: tour.back, classes: 'shepherd-button-secondary', text: '&larr; Atrás' },
                    { action: tour.next, text: 'Siguiente &rarr;' }
                ]
            });

            tour.addStep({
                id: 'step-general-progress',
                title: 'Progreso General de Hitos',
                text: 'Visualiza el progreso general de los hitos del proyecto. Puedes cambiar el tipo de gráfico, el formato del progreso y exportar la información.',
                attachTo: { element: '#general-progress-card', on: 'bottom' },
                 when: {
                    show: () => {
                        const element = document.querySelector('#general-progress-card');
                        if (element) {
                            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                    }
                },
                buttons: [
                    { action: tour.back, classes: 'shepherd-button-secondary', text: '&larr; Atrás' },
                    { action: tour.next, text: 'Siguiente &rarr;' }
                ]
            });

            tour.addStep({
                id: 'step-recent-activity',
                title: 'Actividad Reciente',
                text: 'Mantente al día con las últimas actualizaciones y comentarios sobre el proyecto activo.',
                attachTo: { element: '#recent-activity-card', on: 'left' },
                 when: {
                    show: () => {
                        const element = document.querySelector('#recent-activity-card');
                        if (element) {
                            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                    }
                },
                buttons: [
                    { action: tour.back, classes: 'shepherd-button-secondary', text: '&larr; Atrás' },
                    { action: tour.next, text: 'Siguiente &rarr;' } // Points to notifications
                ]
            });
            
            // New step for Notification Preferences
            tour.addStep({
                id: 'step-notifications',
                title: 'Notificaciones y Preferencias',
                text: 'Configura cómo deseas recibir las actualizaciones de tus proyectos y guarda tus preferencias.',
                attachTo: { element: '#notification-preferences-card', on: 'left' },
                when: {
                    show: () => {
                        const element = document.querySelector('#notification-preferences-card');
                        if (element) {
                            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                    }
                },
                buttons: [
                    { action: tour.back, classes: 'shepherd-button-secondary', text: '&larr; Atrás' },
                    { action: tour.next, text: 'Siguiente &rarr;' } // Points to chatbot or end
                ]
            });
            
            if (chatbotFab && window.getComputedStyle(chatbotFab).display !== 'none') {
                tour.addStep({
                    id: 'step-chatbot',
                    title: 'Asistente IA',
                    text: 'Haz clic aquí para abrir el asistente de IA. Puedes hacerle preguntas sobre tus proyectos.',
                    attachTo: { element: '#chatbot-fab', on: 'top' },
                    buttons: [
                        { action: tour.back, classes: 'shepherd-button-secondary', text: '&larr; Atrás' },
                        { action: tour.next, text: 'Siguiente &rarr;' }
                    ]
                });
            }


            tour.addStep({
                id: 'step-end',
                title: '¡Tour Completado!',
                text: 'Has explorado las funciones principales. Si necesitas ver este tour de nuevo, haz clic en el enlace "Tour" que aparecerá junto al título "Proyectos" en la barra lateral.',
                buttons: [
                    { action: tour.complete, text: '¡Entendido!' }
                ]
            });

            tour.on('complete', () => {
                localStorage.setItem('appTourVisto', 'true');
                createAndShowTourTriggerIcon();
            });

            tour.on('cancel', () => {
                localStorage.setItem('appTourVisto', 'true');
                createAndShowTourTriggerIcon();
            });
            
            return tour;
        }

        function createAndShowTourTriggerIcon() {
            if (!sidebarProjectTitle) return; 
            if (tourTriggerIcon && tourTriggerIcon.parentNode) return; 

            tourTriggerIcon = document.createElement('span');
            tourTriggerIcon.textContent = 'Tour';
            tourTriggerIcon.className = 'tour-trigger-icon';
            tourTriggerIcon.title = 'Ver el tour de la aplicación';
            
            tourTriggerIcon.addEventListener('click', (e) => {
                e.preventDefault();
                if (appTour) {
                    if (appTour.currentStep && (appTour.currentStep.id === 'step-end' || !appTour.isActive())) {
                        appTour.steps.forEach(step => { // Reset internal state if possible
                           if (typeof step.updateStepOptions === 'function') { // Shepherd specific way to reset
                                step.updateStepOptions({ isOpen: false });
                           }
                        });
                         // For Shepherd, re-adding steps or re-initializing might be cleaner for a full restart
                        appTour = initializeAppTour(); // Re-initialize for a clean start
                        if(appTour) appTour.start();

                    } else if (!appTour.isActive()) {
                         appTour.start();
                    } else {
                        // If tour is active but stuck, or to force restart:
                        appTour.cancel(); // Cancel current
                        appTour = initializeAppTour(); // Re-initialize
                        if(appTour) appTour.start();
                    }
                } else {
                    appTour = initializeAppTour();
                    if (appTour) appTour.start();
                }
            });

            sidebarProjectTitle.parentNode.insertBefore(tourTriggerIcon, sidebarProjectTitle.nextSibling);
        }

        function handleAppTour() {
            if (localStorage.getItem('appTourVisto') === 'true') {
                createAndShowTourTriggerIcon();
            } else {
                if (!appTour) {
                    appTour = initializeAppTour();
                }
                if (appTour && !appTour.isActive()) { 
                    setTimeout(() => {
                         if (dashboardContent.classList.contains('flex')) { 
                            appTour.start();
                        }
                    }, 500);
                }
            }
        }
        // --- FIN LÓGICA DEL TOUR ---

        applyTheme(); 
        checkLoginStatus();
    });
