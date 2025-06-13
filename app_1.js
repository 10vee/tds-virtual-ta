// TDS Virtual TA JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Sample questions data
    const sampleQuestionsData = [
        {
            question: "Should I use gpt-4o-mini which AI proxy supports, or gpt3.5 turbo?",
            answer: "You must use `gpt-3.5-turbo-0125`, even if the AI Proxy only supports `gpt-4o-mini`. Use the OpenAI API directly for this question.",
            links: [
                {
                    url: "https://discourse.onlinedegree.iitm.ac.in/t/ga5-question-8-clarification/155939/4",
                    text: "Use the model that's mentioned in the question."
                },
                {
                    url: "https://discourse.onlinedegree.iitm.ac.in/t/ga5-question-8-clarification/155939/3",
                    text: "My understanding is that you just have to use a tokenizer, similar to what Prof. Anand used, to get the number of tokens and multiply that by the given rate."
                }
            ]
        },
        {
            question: "If a student scores 10/10 on GA4 as well as a bonus, how would it appear on the dashboard?",
            answer: "If a student scores 10/10 on GA4 as well as a bonus, it would appear as \"110\" on the dashboard. The system shows the base score plus bonus points as a combined display.",
            links: [
                {
                    url: "https://discourse.onlinedegree.iitm.ac.in/t/ga4-data-sourcing-discussion-thread-tds-jan-2025/165959/388",
                    text: "GA4 dashboard scoring explanation with bonus points display."
                }
            ]
        },
        {
            question: "I know Docker but have not used Podman before. Should I use Docker for this course?",
            answer: "While you know Docker and haven't used Podman before, I recommend using Podman for this course as it's the preferred containerization tool. However, Docker is also acceptable and will work fine for the course requirements.",
            links: [
                {
                    url: "https://tds.s-anand.net/#/docker",
                    text: "TDS course container tools documentation."
                }
            ]
        },
        {
            question: "When is the TDS Sep 2025 end-term exam?",
            answer: "I don't have information about the TDS Sep 2025 end-term exam date as this information is not available yet. Please check the official course announcements or contact the course administrators for future exam schedules.",
            links: []
        }
    ];

    // Tab switching functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // Sample question button handlers
    const sampleQuestionBtns = document.querySelectorAll('.sample-question-btn');
    const questionInput = document.getElementById('question-input');

    sampleQuestionBtns.forEach(button => {
        button.addEventListener('click', function() {
            const question = this.getAttribute('data-question');
            questionInput.value = question;
            questionInput.focus();
            
            // Add visual feedback
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Form submission handling
    const submitBtn = document.getElementById('submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const loadingSpinner = submitBtn.querySelector('.loading-spinner');
    const responseArea = document.getElementById('response-area');
    const responseAnswer = document.getElementById('response-answer');
    const responseLinks = document.getElementById('response-links');
    const imageUpload = document.getElementById('image-upload');

    // Image upload handling
    let uploadedImageBase64 = '';
    
    imageUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                alert('Image file size must be less than 5MB');
                this.value = '';
                return;
            }
            
            const reader = new FileReader();
            reader.onload = function(e) {
                uploadedImageBase64 = e.target.result.split(',')[1]; // Remove data:image/...;base64, prefix
                console.log('Image uploaded and converted to base64');
            };
            reader.onerror = function() {
                alert('Error reading image file');
                imageUpload.value = '';
            };
            reader.readAsDataURL(file);
        } else {
            uploadedImageBase64 = '';
        }
    });

    // Submit form handler
    submitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const question = questionInput.value.trim();
        
        if (!question) {
            alert('Please enter a question before submitting.');
            questionInput.focus();
            return;
        }

        // Show loading state
        btnText.classList.add('hidden');
        loadingSpinner.classList.remove('hidden');
        loadingSpinner.textContent = 'Processing...';
        submitBtn.disabled = true;
        responseArea.classList.add('hidden');

        // Simulate API call with delay
        setTimeout(() => {
            processQuestion(question, uploadedImageBase64);
        }, 2000); // Fixed 2 second delay
    });

    function processQuestion(question, imageBase64) {
        // Find matching sample question or provide generic response
        let response = findMatchingResponse(question);
        
        if (!response) {
            response = generateGenericResponse(question);
        }

        displayResponse(response);
        
        // Reset form state
        btnText.classList.remove('hidden');
        loadingSpinner.classList.add('hidden');
        submitBtn.disabled = false;
        
        // Clear image upload
        imageUpload.value = '';
        uploadedImageBase64 = '';
    }

    function findMatchingResponse(question) {
        const lowerQuestion = question.toLowerCase();
        
        // Exact match first
        for (const sample of sampleQuestionsData) {
            if (sample.question.toLowerCase() === lowerQuestion) {
                return sample;
            }
        }
        
        // Partial match based on keywords
        for (const sample of sampleQuestionsData) {
            const sampleLower = sample.question.toLowerCase();
            const questionWords = lowerQuestion.split(' ').filter(word => word.length > 3);
            const sampleWords = sampleLower.split(' ').filter(word => word.length > 3);
            
            let matchCount = 0;
            questionWords.forEach(word => {
                if (sampleWords.some(sampleWord => sampleWord.includes(word) || word.includes(sampleWord))) {
                    matchCount++;
                }
            });
            
            // If more than 40% of words match, consider it a match
            if (matchCount / questionWords.length > 0.4) {
                return sample;
            }
        }
        
        return null;
    }

    function generateGenericResponse(question) {
        const lowerQuestion = question.toLowerCase();
        
        // Categorize question and provide appropriate response
        if (lowerQuestion.includes('assignment') || lowerQuestion.includes('ga') || lowerQuestion.includes('grade')) {
            return {
                question: question,
                answer: "For assignment-related questions, please check the course dashboard for specific requirements and submission guidelines. If you need clarification on grading, refer to the assignment rubric or post your question on the course forum.",
                links: [
                    {
                        url: "https://discourse.onlinedegree.iitm.ac.in",
                        text: "Post your question on the TDS course forum for detailed assistance."
                    }
                ]
            };
        } else if (lowerQuestion.includes('docker') || lowerQuestion.includes('podman') || lowerQuestion.includes('container')) {
            return {
                question: question,
                answer: "For containerization questions, both Docker and Podman are supported in the course. Podman is preferred but Docker will work as well. Check the course documentation for setup instructions.",
                links: [
                    {
                        url: "https://tds.s-anand.net/#/docker",
                        text: "TDS course container setup documentation."
                    }
                ]
            };
        } else if (lowerQuestion.includes('api') || lowerQuestion.includes('gpt') || lowerQuestion.includes('openai')) {
            return {
                question: question,
                answer: "For API-related questions, make sure to follow the specific model requirements mentioned in the assignment. Use the OpenAI API directly when specified, even if other proxies are available.",
                links: [
                    {
                        url: "https://discourse.onlinedegree.iitm.ac.in",
                        text: "Search the forum for similar API questions and solutions."
                    }
                ]
            };
        } else if (lowerQuestion.includes('exam') || lowerQuestion.includes('schedule') || lowerQuestion.includes('date')) {
            return {
                question: question,
                answer: "For exam schedules and important dates, please check the official course announcements and the academic calendar. Future exam dates are typically announced well in advance.",
                links: [
                    {
                        url: "https://discourse.onlinedegree.iitm.ac.in",
                        text: "Check the course announcements section for exam schedules."
                    }
                ]
            };
        } else {
            return {
                question: question,
                answer: "Thank you for your question! While I don't have a specific answer in my knowledge base, I recommend posting this question on the course forum where instructors and fellow students can provide detailed assistance.",
                links: [
                    {
                        url: "https://discourse.onlinedegree.iitm.ac.in",
                        text: "Post your question on the TDS course forum."
                    },
                    {
                        url: "https://tds.s-anand.net",
                        text: "Check the main course website for documentation."
                    }
                ]
            };
        }
    }

    function displayResponse(response) {
        // Display the answer
        responseAnswer.innerHTML = `<p>${response.answer}</p>`;
        
        // Display links if available
        if (response.links && response.links.length > 0) {
            let linksHtml = '<h4>Helpful Links:</h4>';
            response.links.forEach(link => {
                linksHtml += `<a href="${link.url}" target="_blank" class="link-item">${link.text}</a>`;
            });
            responseLinks.innerHTML = linksHtml;
        } else {
            responseLinks.innerHTML = '<h4>No additional links available for this question.</h4>';
        }
        
        // Show response area
        responseArea.classList.remove('hidden');
        
        // Scroll to response
        setTimeout(() => {
            responseArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + Enter to submit
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            if (document.activeElement === questionInput) {
                submitBtn.click();
            }
        }
        
        // Escape to clear form
        if (e.key === 'Escape') {
            if (questionInput.value) {
                questionInput.value = '';
                responseArea.classList.add('hidden');
                imageUpload.value = '';
                uploadedImageBase64 = '';
            }
        }
    });

    // Auto-resize textarea
    questionInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 300) + 'px';
    });

    // Add smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Handle form validation
    questionInput.addEventListener('blur', function() {
        if (this.value.trim().length > 0 && this.value.trim().length < 5) {
            this.style.borderColor = 'var(--color-warning)';
            
            let helpText = document.getElementById('question-help');
            if (!helpText) {
                helpText = document.createElement('small');
                helpText.id = 'question-help';
                helpText.className = 'form-text';
                helpText.style.color = 'var(--color-warning)';
                this.parentNode.appendChild(helpText);
            }
            helpText.textContent = 'Please enter a more detailed question (at least 5 characters).';
        } else {
            this.style.borderColor = '';
            const helpText = document.getElementById('question-help');
            if (helpText) {
                helpText.remove();
            }
        }
    });

    // Initialize with welcome message
    console.log('🚀 TDS Virtual TA initialized successfully!');
    console.log('💡 Tips:');
    console.log('  - Use Ctrl/Cmd + Enter to submit questions quickly');
    console.log('  - Press Escape to clear the form');
    console.log('  - Upload images up to 5MB for visual questions');
});