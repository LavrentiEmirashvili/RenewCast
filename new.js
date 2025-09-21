// Animation observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

// Function to update charts based on selected station
function updateChartsForStation(stationId) {
    const days = ['24 აგვ', '25 აგვ', '26 აგვ', '27 აგვ', '28 აგვ', '29 აგვ', '30 აგვ', '31 აგვ'];
    
    let powerData, dischargeData, precipitationData;
    
    switch(stationId) {
        case 'hpp1':
            powerData = [5.3, 5.3, 7.8, 7.0, 6.8, 6.8, 6.0, 5.3];
            dischargeData = [79.7, 79.9, 81.3, 79.5, 82.0, 84.9, 86.6, 83.4];
            precipitationData = [0, 0, 0.15, 0.1, 0, 0, 0, 0];
            break;
        case 'hpp2':
            powerData = [4.2, 4.5, 6.1, 5.8, 5.5, 5.2, 4.8, 4.1];
            dischargeData = [65.2, 67.8, 70.1, 68.5, 69.2, 71.5, 73.8, 70.9];
            precipitationData = [0, 0, 0.08, 0.05, 0, 0, 0, 0];
            break;
        case 'hpp3':
            powerData = [3.8, 4.1, 5.5, 5.2, 4.9, 4.6, 4.2, 3.7];
            dischargeData = [58.3, 60.7, 63.2, 61.8, 62.5, 64.9, 67.1, 64.2];
            precipitationData = [0, 0, 0.12, 0.08, 0, 0, 0, 0];
            break;
        default:
            powerData = [5.3, 5.3, 7.8, 7.0, 6.8, 6.8, 6.0, 5.3];
            dischargeData = [79.7, 79.9, 81.3, 79.5, 82.0, 84.9, 86.6, 83.4];
            precipitationData = [0, 0, 0.15, 0.1, 0, 0, 0, 0];
    }
    
    const predictedData = powerData.map(val => val + (Math.random() - 0.5) * 2);
    
    // Update production chart
    if (productionChart) {
        productionChart.data.datasets[0].data = powerData;
        productionChart.data.datasets[1].data = predictedData;
        productionChart.update();
    }
    
    // Update water chart
    if (waterChart) {
        waterChart.data.datasets[0].data = dischargeData;
        waterChart.data.datasets[1].data = precipitationData;
        waterChart.update();
    }
}

// HPP Prediction function
function generateHPPPrediction() {
    const loading = document.getElementById('loading');
    const result = document.getElementById('predictionResult');
    const button = document.querySelector('.predict-button');
    
    // Add button loading state
    button.style.transform = 'scale(0.95)';
    button.style.opacity = '0.7';
    button.disabled = true;
    
    loading.style.display = 'block';
    loading.style.opacity = '0';
    loading.style.transform = 'translateY(20px)';
    result.style.display = 'none';

    // Animate loading appearance
    setTimeout(() => {
        loading.style.transition = 'all 0.3s ease';
        loading.style.opacity = '1';
        loading.style.transform = 'translateY(0)';
    }, 100);

    setTimeout(() => {
        // Get input values
        const waterLevel = parseFloat(document.getElementById('waterLevel').value) || 145;
        const precipitation = parseFloat(document.getElementById('precipitation').value) || 12;
        const temperature = parseFloat(document.getElementById('temperature').value) || 15;
        const inflow = parseFloat(document.getElementById('inflow').value) || 85;

        // Simple prediction algorithm (in real app, this would be ML model)
        const baseGeneration = (waterLevel - 100) * 0.8 + (inflow * 1.2) + (precipitation * 0.5);
        const temperatureFactor = temperature > 10 ? 1.1 : 0.9;
        const predictedGeneration = Math.round(baseGeneration * temperatureFactor);
        
        const confidence = Math.round(85 + Math.random() * 15);
        const potentialSavings = Math.round((predictedGeneration * 120 * 0.024) / 10) * 10;

        // Update results
        document.getElementById('predictedGeneration').textContent = `${predictedGeneration} MW`;
        document.getElementById('confidenceLevel').textContent = `${confidence}%`;
        document.getElementById('potentialSavings').textContent = `€${potentialSavings}`;

        loading.style.display = 'none';
        result.style.display = 'block';
        
        // Reset button
        button.style.transform = 'scale(1)';
        button.style.opacity = '1';
        button.disabled = false;
        
        // Animate result
        result.style.opacity = '0';
        result.style.transform = 'translateY(20px)';
        setTimeout(() => {
            result.style.transition = 'all 0.5s ease';
            result.style.opacity = '1';
            result.style.transform = 'translateY(0)';
        }, 100);

    }, 2000);
}

// Prediction function
function generatePrediction() {
    const loading = document.getElementById('loading');
    const result = document.getElementById('predictionResult');
    
    loading.style.display = 'block';
    result.style.display = 'none';

    setTimeout(() => {
        // Get input values
        const waterLevel = parseFloat(document.getElementById('waterLevel').value) || 145;
        const precipitation = parseFloat(document.getElementById('precipitation').value) || 12;
        const temperature = parseFloat(document.getElementById('temperature').value) || 15;
        const inflow = parseFloat(document.getElementById('inflow').value) || 85;
        const marketPrice = parseFloat(document.getElementById('marketPrice').value) || 120;

        // Simple prediction algorithm (in real app, this would be ML model)
        const baseGeneration = (waterLevel - 100) * 0.8 + (inflow * 1.2) + (precipitation * 0.5);
        const temperatureFactor = temperature > 10 ? 1.1 : 0.9;
        const predictedGeneration = Math.round(baseGeneration * temperatureFactor);
        
        const confidence = Math.round(85 + Math.random() * 15);
        const potentialSavings = Math.round((predictedGeneration * marketPrice * 0.024) / 10) * 10;

        // Update results
        document.getElementById('predictedGeneration').textContent = `${predictedGeneration} MW`;
        document.getElementById('confidenceLevel').textContent = `${confidence}%`;
        document.getElementById('potentialSavings').textContent = `€${potentialSavings}`;

        loading.style.display = 'none';
        result.style.display = 'block';
        
        // Animate result
        result.style.opacity = '0';
        result.style.transform = 'translateY(20px)';
        setTimeout(() => {
            result.style.transition = 'all 0.5s ease';
            result.style.opacity = '1';
            result.style.transform = 'translateY(0)';
        }, 100);

    }, 2000);
}

// Animate stats on scroll
function animateStats() {
    const values = {
        accuracy: '- - -',
        savings: '- - -',
        efficiency: '- - -',
        stations: '3'
    };

    Object.keys(values).forEach(key => {
        const el = document.getElementById(key);
        if (el) el.textContent = values[key];
    });
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
        renderAllHPPCharts();
});

// Render all HPP charts (production and water) for each HPP
function renderAllHPPCharts() {
    // HPP DATA ARRAYS
    const hpp1 = [
        {"date":"2025-08-18","actual":4.4,"precip_mm":0.0,"fc_p10":3.89,"fc_p50":5.52,"fc_p90":8.30},
        {"date":"2025-08-19","actual":4.1,"precip_mm":0.0,"fc_p10":3.89,"fc_p50":5.52,"fc_p90":8.30},
        {"date":"2025-08-20","actual":4.3,"precip_mm":0.7,"fc_p10":3.35,"fc_p50":5.48,"fc_p90":9.09},
        {"date":"2025-08-21","actual":17.7,"precip_mm":5.4,"fc_p10":4.93,"fc_p50":6.57,"fc_p90":19.71},
        {"date":"2025-08-22","actual":9.8,"precip_mm":0.0,"fc_p10":11.94,"fc_p50":13.58,"fc_p90":16.36},
        {"date":"2025-08-23","actual":6.8,"precip_mm":0.0,"fc_p10":5.28,"fc_p50":6.91,"fc_p90":9.69},
        {"date":"2025-08-24","actual":5.3,"precip_mm":0.1,"fc_p10":3.90,"fc_p50":6.02,"fc_p90":9.63}
    ];
    const hpp2 = [
        {"date":"2025-08-07","actual":47.0,"precip_mm":0.0,"fc_p10":35.97,"fc_p50":46.3,"fc_p90":56.63},
        {"date":"2025-08-08","actual":61.0,"precip_mm":4.3,"fc_p10":36.02,"fc_p50":48.2,"fc_p90":60.39},
        {"date":"2025-08-09","actual":72.0,"precip_mm":34.8,"fc_p10":30.14,"fc_p50":63.8,"fc_p90":97.46},
        {"date":"2025-08-10","actual":50.0,"precip_mm":14.4,"fc_p10":45.43,"fc_p50":73.74,"fc_p90":102.05},
        {"date":"2025-08-11","actual":43.0,"precip_mm":0.0,"fc_p10":43.92,"fc_p50":56.0,"fc_p90":68.08},
        {"date":"2025-08-12","actual":45.0,"precip_mm":1.5,"fc_p10":34.89,"fc_p50":45.62,"fc_p90":56.36},
        {"date":"2025-08-13","actual":39.0,"precip_mm":0.6,"fc_p10":34.37,"fc_p50":44.61,"fc_p90":54.85}
    ];
    const hpp3 = [
        {"date":"2025-08-11","actual":17.5,"precip_mm":3.4,"fc_p10":13.39,"fc_p50":17.72,"fc_p90":22.05},
        {"date":"2025-08-12","actual":17.4,"precip_mm":4.8,"fc_p10":13.63,"fc_p50":17.41,"fc_p90":23.18},
        {"date":"2025-08-13","actual":17.1,"precip_mm":0.8,"fc_p10":13.94,"fc_p50":17.6,"fc_p90":21.27},
        {"date":"2025-08-14","actual":17.2,"precip_mm":1.5,"fc_p10":13.68,"fc_p50":17.5,"fc_p90":21.33},
        {"date":"2025-08-15","actual":17.6,"precip_mm":7.7,"fc_p10":13.66,"fc_p50":18.11,"fc_p90":23.77},
        {"date":"2025-08-16","actual":24.3,"precip_mm":37.1,"fc_p10":16.85,"fc_p50":23.78,"fc_p90":36.61},
        {"date":"2025-08-17","actual":23.7,"precip_mm":1.5,"fc_p10":18.37,"fc_p50":23.15,"fc_p90":27.54}
    ];

    [
        {data: hpp1, outputId: 'hpp1-output-chart', precipId: 'hpp1-precip-chart'},
        {data: hpp2, outputId: 'hpp2-output-chart', precipId: 'hpp2-precip-chart'},
        {data: hpp3, outputId: 'hpp3-output-chart', precipId: 'hpp3-precip-chart'}
    ].forEach(hpp => {
        const days = hpp.data.map(d => d.date ? d.date.slice(5).replace('-', '/') : '');
        const actual = hpp.data.map(d => d.actual ?? null);
        const p10 = hpp.data.map(d => d.fc_p10 ?? null);
        const p50 = hpp.data.map(d => d.fc_p50 ?? null);
        const p90 = hpp.data.map(d => d.fc_p90 ?? null);
        const precip = hpp.data.map(d => d.precip_mm ?? null);

        // Output chart (actual, prognosed, margin)
        const outputCtx = document.getElementById(hpp.outputId)?.getContext('2d');
        if (outputCtx) {
            new Chart(outputCtx, {
                type: 'line',
                data: {
                    labels: days,
                    datasets: [
                        // Margin of error area (gray highlight, fill between p90 and p10)

                        {
                            label: '',
                            data: p10,
                            borderColor: 'rgba(0,0,0,0)',
                            backgroundColor: 'rgba(0,0,0,0)',
                            fill: false,
                            pointRadius: 0,
                            borderWidth: 0,
                            tension: 0.4,
                            type: 'line',
                            order: 1
                        },
                        // Actual and Prognosed lines
                        {
                            label: 'ფაქტობრივი გამომუშავება',
                            data: actual,
                            borderColor: '#ffe59a',
                            backgroundColor: 'rgba(255, 229, 154, 0.15)',
                            fill: false,
                            tension: 0.4,
                            borderWidth: 3,
                            pointBackgroundColor: '#ffe59a',
                            pointRadius: 5,
                            pointHoverRadius: 7
                        },
                        {
                            label: 'პროგნოზი (საშუალო)',
                            data: p50,
                            borderColor: 'rgba(138, 122, 237, 1)',
                            backgroundColor: 'rgba(138, 122, 237, 0.08)',
                            fill: false,
                            tension: 0.4,
                            borderWidth: 2,
                            pointBackgroundColor: 'rgba(138, 122, 237, 1)',
                            pointRadius: 4,
                            pointHoverRadius: 6
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
                                color: '#ffe59a',
                                font: { size: 13 }
                            }
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false
                        }
                    },
                    interaction: {
                        mode: 'nearest',
                        axis: 'x',
                        intersect: false
                    },
                    scales: {
                        x: {
                            ticks: { color: '#ffe59a' },
                            grid: { color: 'rgba(255, 229, 154, 0.08)' }
                        },
                        y: {
                            beginAtZero: false,
                            title: {
                                display: true,
                                text: 'MW',
                                color: '#ffe59a'
                            },
                            ticks: { color: '#ffe59a' },
                            grid: { color: 'rgba(255, 229, 154, 0.08)' }
                        }
                    }
                }
            });
        }

        // Precipitation bar chart
        const precipCtx = document.getElementById(hpp.precipId)?.getContext('2d');
        if (precipCtx) {
            new Chart(precipCtx, {
                type: 'bar',
                data: {
                    labels: days,
                    datasets: [
                        {
                            label: 'ნალექი (მმ)',
                            data: precip,
                            backgroundColor: 'rgba(138, 122, 237, 0.5)',
                            borderColor: '#ffe59a',
                            borderWidth: 2,
                            hoverBackgroundColor: '#ffe59a',
                            borderRadius: 8,
                            maxBarThickness: 40
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
                                color: '#ffe59a',
                                font: { size: 13 }
                            }
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false
                        }
                    },
                    scales: {
                        x: {
                            ticks: { color: '#ffe59a' },
                            grid: { color: 'rgba(255, 229, 154, 0.08)' }
                        },
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'მმ',
                                color: '#ffe59a'
                            },
                            ticks: { color: '#ffe59a' },
                            grid: { color: 'rgba(255, 229, 154, 0.08)' }
                        }
                    }
                }
            });
        }
    });
}
    initCharts();
    
    // Set stats immediately without animation
    animateStats();

    // Initialize blog functionality
    initializeBlog();
    
    // Add touch-friendly interactions for mobile
    addTouchInteractions();
    
    // Add dashboard touch interactions
    addDashboardTouchInteractions();
    
    // Add footer touch interactions
    addFooterTouchInteractions();
    
    // Initialize mobile menu
    initializeMobileMenu();

    // Update stations count dynamically
    updateStationsCount();
// End of DOMContentLoaded event

function updateStationsCount() {
    const stationsEl = document.getElementById('stations');
    if (!stationsEl) return;
    stationsEl.textContent = '3';
}

// Touch-friendly interactions for mobile devices
function addTouchInteractions() {
    const stationCards = document.querySelectorAll('.station-card');
    const stationButtons = document.querySelectorAll('.station-btn');
    
    // Add touch events for station cards
    stationCards.forEach(card => {
        card.addEventListener('touchstart', function(e) {
            this.style.transform = 'scale(0.98)';
            this.style.transition = 'transform 0.1s ease';
        });
        
        card.addEventListener('touchend', function(e) {
            this.style.transform = 'scale(1)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        card.addEventListener('touchcancel', function(e) {
            this.style.transform = 'scale(1)';
            this.style.transition = 'transform 0.2s ease';
        });
    });

    // Add touch events for station buttons specifically
    stationButtons.forEach(button => {
        button.addEventListener('touchstart', function(e) {
            e.preventDefault();
            this.style.transform = 'scale(0.9)';
            this.style.transition = 'transform 0.1s ease';
            this.style.background = 'linear-gradient(135deg, #4a3a9d 0%, #6a5add 100%)';
        });

        button.addEventListener('touchend', function(e) {
            e.preventDefault();
            this.style.transform = 'scale(1)';
            this.style.transition = 'transform 0.2s ease';
            this.style.background = 'linear-gradient(135deg, #ffe59a 0%, #ffe59a 100%)';
            
            // Trigger click event
            const clickEvent = new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                view: window
            });
            this.dispatchEvent(clickEvent);
        });

        button.addEventListener('touchcancel', function(e) {
            this.style.transform = 'scale(1)';
            this.style.transition = 'transform 0.2s ease';
            this.style.background = 'linear-gradient(135deg, #ffe59a 0%, #ffe59a 100%)';
        });
    });
    
    // Add touch events for data-points
    const dataPoints = document.querySelectorAll('.data-point');
    dataPoints.forEach(point => {
        point.addEventListener('touchstart', function(e) {
            this.style.transform = 'translateX(8px) scale(1.02)';
            this.style.transition = 'transform 0.1s ease';
            this.style.color = '#ffe59a';
        });
        
        point.addEventListener('touchend', function(e) {
            this.style.transform = 'translateX(0) scale(1)';
            this.style.transition = 'transform 0.2s ease';
            this.style.color = '#f5f5f5';
        });
        
        point.addEventListener('touchcancel', function(e) {
            this.style.transform = 'translateX(0) scale(1)';
            this.style.transition = 'transform 0.2s ease';
            this.style.color = '#f5f5f5';
        });
    });
    
    // Prevent zoom on double tap for buttons
    stationButtons.forEach(button => {
        button.addEventListener('touchend', function(e) {
            e.preventDefault();
        });
    });
}

// Blog functionality
function initializeBlog() {
    // Wait for DOM to be fully loaded
    setTimeout(() => {
        // Add click handlers for blog posts
        const readMoreLinks = document.querySelectorAll('.read-more');
        console.log('Found read-more links:', readMoreLinks.length);
        
        readMoreLinks.forEach((link, index) => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Read more clicked:', index);
                
                const blogPost = this.closest('.blog-post');
                const title = blogPost.querySelector('h4').textContent;
                
                console.log('Blog title:', title);
                
                // Show blog content modal
                showBlogModal(title, getBlogContent(title));
            });
        });

        // Add hover effects for blog images
        document.querySelectorAll('.blog-image').forEach(image => {
            image.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.02)';
            });
            
            image.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }, 100);
}

// Blog content data
function getBlogContent(title) {
    const blogContents = {
        'ხელოვნური ინტელექტი ჰიდროენერგეტიკაში': `
            <h2>ხელოვნური ინტელექტი ჰიდროენერგეტიკაში</h2>
            <p>ჰიდროელექტროსადგურების მართვა ყოველთვის იყო რთული ამოცანა, რომელიც მოითხოვს 
            ზუსტ პროგნოზირებას და ოპტიმალურ გადაწყვეტილებებს. ხელოვნური ინტელექტი ცვლის 
            ამ სფეროს ფუნდამენტურად.</p>
            
            <h3>AI-ის უპირატესობები</h3>
            <ul>
                <li>95%+ სიზუსტე პროგნოზებში</li>
                <li>რეალური დროის მონიტორინგი</li>
                <li>ავტომატური ოპტიმიზაცია</li>
                <li>ფინანსური დანაზოგი</li>
            </ul>
            
            <p>ჩვენი HydroPredictAI სისტემა იყენებს მაშინ ლერნინგის ალგორითმებს 
            ჰიდროლოგიური და მეტეოროლოგიური მონაცემების ანალიზისთვის.</p>
        `,
        'კლიმატის ცვლილება და ენერგეტიკა': `
            <h2>კლიმატის ცვლილება და ენერგეტიკა</h2>
            <p>კლიმატის ცვლილება ქმნის ახალ გამოწვევებს ენერგეტიკის სფეროში. 
            ჰიდროელექტროსადგურები განსაკუთრებით მგრძნობიარეა ამ ცვლილებების მიმართ.</p>
            
            <h3>მთავარი გამოწვევები</h3>
            <ul>
                <li>ნალექების ცვალებადობის ზრდა</li>
                <li>წყლის დონის ცვლილებები</li>
                <li>ექსტრემალური ამინდის მოვლენები</li>
                <li>სეზონური ცვლილებები</li>
            </ul>
            
            <p>ჩვენი ტექნოლოგია ეხმარება ადაპტირებას ამ ცვლილებებთან და 
            უზრუნველყოფს სტაბილურ ენერგომომარაგებას.</p>
        `,
        'ენერგეტიკის მომავალი ტექნოლოგიები': `
            <h2>ენერგეტიკის მომავალი ტექნოლოგიები</h2>
            <p>ენერგეტიკის სფერო განიცდის რევოლუციურ ცვლილებებს. ახალი ტექნოლოგიები 
            ცვლის იმას, თუ როგორ ვაწარმოებთ, ვინახავთ და ვიყენებთ ენერგიას.</p>
            
            <h3>მომავლის ტექნოლოგიები</h3>
            <ul>
                <li>ხელოვნური ინტელექტი და მაშინ ლერნინგი</li>
                <li>ინტერნეტი ნივთების (IoT)</li>
                <li>ბლოკჩეინი ენერგეტიკაში</li>
                <li>წყალბადის ტექნოლოგიები</li>
            </ul>
            
            <p>ჩვენ ვმუშაობთ ამ ტექნოლოგიების ინტეგრაციაზე ჩვენს სისტემაში 
            მაქსიმალური ეფექტურობის მისაღწევად.</p>
        `
    };
    
    return blogContents[title] || '<p>ბლოგის სრული ტექსტი მალე იქნება ხელმისაწვდომი.</p>';
}

// Show blog modal
function showBlogModal(title, content) {
    // Remove existing modal if any
    const existingModal = document.querySelector('.blog-modal');
    if (existingModal) {
        existingModal.remove();
    }

    // Create modal
    const modal = document.createElement('div');
    modal.className = 'blog-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${title}</h2>
                    <button class="close-modal" aria-label="დახურვა">&times;</button>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
                <div class="modal-footer">
                    <button class="modal-close-btn">დახურვა</button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    const modalStyles = `
        .blog-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            animation: modalFadeIn 0.3s ease forwards;
        }
        
        @keyframes modalFadeIn {
            to {
                opacity: 1;
            }
        }
        
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            backdrop-filter: blur(15px);
            cursor: pointer;
        }
        
        .modal-content {
            background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
            border-radius: 20px;
            max-width: 900px;
            max-height: 85vh;
            width: 95%;
            border: 1px solid rgba(255, 229, 154, 0.4);
            position: relative;
            z-index: 1;
            overflow: hidden;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
            transform: scale(0.8);
            animation: modalSlideIn 0.3s ease forwards;
            margin: 0 auto;
        }
        
        @keyframes modalSlideIn {
            to {
                transform: scale(1);
            }
        }
        
        @keyframes modalFadeOut {
            to {
                opacity: 0;
            }
        }
        
        @keyframes modalSlideOut {
            to {
                transform: scale(0.8);
            }
        }
        
        .modal-header {
            padding: 25px 30px;
            border-bottom: 1px solid rgba(255, 229, 154, 0.3);
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: linear-gradient(90deg, rgba(255, 229, 154, 0.1), transparent);
        }
        
        .modal-header h2 {
            color: #f5f5f5;
            margin: 0;
            font-size: 1.6rem;
            font-weight: 600;
            line-height: 1.3;
        }
        
        .close-modal {
            background: rgba(255, 229, 154, 0.2);
            border: 1px solid rgba(255, 229, 154, 0.3);
            color: #ffe59a;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            width: 35px;
            height: 35px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.3s ease;
        }
        
        .close-modal:hover {
            background: rgba(255, 229, 154, 0.4);
            color: #ffe59a;
            transform: rotate(90deg);
        }
        
        .modal-body {
            padding: 30px;
            color: #f5f5f5;
            overflow-y: auto;
            max-height: 55vh;
            line-height: 1.7;
        }
        
        .modal-body h2 {
            color: #ffe59a;
            margin-bottom: 20px;
            font-size: 1.4rem;
            border-bottom: 2px solid rgba(255, 229, 154, 0.3);
            padding-bottom: 10px;
        }
        
        .modal-body h3 {
            color: #f5f5f5;
            margin: 25px 0 15px 0;
            font-size: 1.2rem;
            font-weight: 600;
        }
        
        .modal-body ul {
            margin: 20px 0;
            padding-left: 25px;
        }
        
        .modal-body li {
            margin-bottom: 10px;
            color: rgba(245, 245, 245, 0.9);
            position: relative;
        }
        
        .modal-body li::marker {
            color: #ffe59a;
        }
        
        .modal-body p {
            line-height: 1.7;
            margin-bottom: 18px;
            color: rgba(245, 245, 245, 0.85);
            font-size: 1rem;
        }
        
        .modal-footer {
            padding: 20px 30px;
            border-top: 1px solid rgba(255, 229, 154, 0.2);
            text-align: center;
            background: rgba(255, 229, 154, 0.05);
        }
        
        .modal-close-btn {
            background: #ffe59a;
            color: white;
            border: none;
            padding: 12px 30px;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .modal-close-btn:hover {
            background: #ffe59a;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(255, 229, 154, 0.4);
        }
        
        @media (max-width: 768px) {
            .modal-content {
                width: 98%;
                max-height: 90vh;
                margin: 10px;
            }
            
            .modal-header, .modal-body, .modal-footer {
                padding: 20px;
            }
            
            .modal-header h2 {
                font-size: 1.3rem;
            }
        }
    `;
    
    // Add styles if not already added
    if (!document.getElementById('modal-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'modal-styles';
        styleSheet.textContent = modalStyles;
        document.head.appendChild(styleSheet);
    }
    
    // Add modal to page
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeModal = () => {
        modal.style.animation = 'modalFadeOut 0.3s ease forwards';
        modal.querySelector('.modal-content').style.animation = 'modalSlideOut 0.3s ease forwards';
        
        setTimeout(() => {
            modal.remove();
        }, 300);
    };
    
    // Add close event listeners
    modal.querySelector('.close-modal').addEventListener('click', closeModal);
    modal.querySelector('.modal-close-btn').addEventListener('click', closeModal);
    modal.querySelector('.modal-overlay').addEventListener('click', closeModal);
    
    // Close on Escape key
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
    
    // Prevent modal content clicks from closing modal
    modal.querySelector('.modal-content').addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

// Add touch interactions for dashboard stat cards
function addDashboardTouchInteractions() {
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.addEventListener('touchstart', function(e) {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.transition = 'transform 0.1s ease';
            this.style.borderColor = 'rgba(255, 229, 154, 0.8)';
            this.style.boxShadow = '0 25px 50px rgba(255, 229, 154, 0.4)';
        });

        card.addEventListener('touchend', function(e) {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.transition = 'transform 0.2s ease';
            this.style.borderColor = 'rgba(255, 229, 154, 0.3)';
            this.style.boxShadow = 'none';
        });

        card.addEventListener('touchcancel', function(e) {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.transition = 'transform 0.2s ease';
            this.style.borderColor = 'rgba(255, 229, 154, 0.3)';
            this.style.boxShadow = 'none';
        });
    });
}

// Add touch interactions for footer elements
function addFooterTouchInteractions() {
    // Footer contact items touch interactions
    const footerContactItems = document.querySelectorAll('.footer-contact p');
    footerContactItems.forEach(item => {
        item.addEventListener('touchstart', function(e) {
            this.style.transform = 'translateY(-3px) scale(1.02)';
            this.style.transition = 'transform 0.1s ease';
            this.style.background = 'rgba(255, 229, 154, 0.3)';
            this.style.borderColor = 'rgba(255, 229, 154, 0.6)';
        });

        item.addEventListener('touchend', function(e) {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.transition = 'transform 0.2s ease';
            this.style.background = 'rgba(255, 229, 154, 0.1)';
            this.style.borderColor = 'rgba(255, 229, 154, 0.2)';
        });

        item.addEventListener('touchcancel', function(e) {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.transition = 'transform 0.2s ease';
            this.style.background = 'rgba(255, 229, 154, 0.1)';
            this.style.borderColor = 'rgba(255, 229, 154, 0.2)';
        });
    });

    // Social links touch interactions
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('touchstart', function(e) {
            this.style.transform = 'translateY(-4px) scale(1.05)';
            this.style.transition = 'transform 0.1s ease';
            this.style.background = 'rgba(255, 229, 154, 0.3)';
            this.style.borderColor = 'rgba(255, 229, 154, 0.6)';
            this.style.boxShadow = '0 12px 25px rgba(255, 229, 154, 0.5)';
        });

        link.addEventListener('touchend', function(e) {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.transition = 'transform 0.2s ease';
            this.style.background = 'rgba(255, 229, 154, 0.1)';
            this.style.borderColor = 'rgba(255, 229, 154, 0.2)';
            this.style.boxShadow = 'none';
        });

        link.addEventListener('touchcancel', function(e) {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.transition = 'transform 0.2s ease';
            this.style.background = 'rgba(255, 229, 154, 0.1)';
            this.style.borderColor = 'rgba(255, 229, 154, 0.2)';
            this.style.boxShadow = 'none';
        });
    });
}

// Initialize mobile menu functionality
function initializeMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    
    // Open mobile menu
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // Close mobile menu
    mobileMenuClose.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Close mobile menu when clicking on links
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
    
    // Close mobile menu when clicking outside
    mobileMenu.addEventListener('click', function(e) {
        if (e.target === mobileMenu) {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Touch events for mobile menu
    mobileMenuBtn.addEventListener('touchstart', function(e) {
        e.preventDefault();
        this.style.transform = 'scale(0.9)';
    });
    
    mobileMenuBtn.addEventListener('touchend', function(e) {
        e.preventDefault();
        this.style.transform = 'scale(1)';
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}
