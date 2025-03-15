function validateAndCalculate() {
    let allQuestionsAnswered = true;
    let genderSelected = false;
    
    // Check if all questions are answered
    for (let i = 1; i <= 5; i++) {
        if (!$(`input[name="q${i}"]:checked`).val()) {
            allQuestionsAnswered = false;
            break;
        }
    }
    
    // Check if gender is selected
    if ($('input[name="gender"]:checked').val()) {
        genderSelected = true;
    }
    
    if (!allQuestionsAnswered || !genderSelected) {
        alert("Please answer all questions and select your gender before seeing the results.");
        return;
    }
    
    calculateResult();
}

function calculateResult() {
    let answers = {};
    let gender = $('input[name="gender"]:checked').val();
    
    $("#quiz-form input[type='radio']:checked").each(function() {
        let name = $(this).attr('name');
        if (name !== 'gender') {
            let value = $(this).val();
            answers[value] = (answers[value] || 0) + 1;
        }
    });
    
    let sortedResults = Object.entries(answers).sort((a, b) => b[1] - a[1]);
    let topArchetypes = sortedResults.slice(0, 2).map(entry => entry[0]).join(' and ');
    
    let insights = {
        'Hero': {
            male: "As a male Hero, you are driven by achievement and courage. You seek to prove yourself through conquering challenges and protecting others.",
            female: "As a female Hero, you possess determination and resilience. You inspire others through your courageous actions and problem-solving abilities."
        },
        'Sage': {
            male: "As a male Sage, you seek truth and understanding. Your analytical mind and wisdom make you a valuable advisor and mentor to others.",
            female: "As a female Sage, your insight and intuition give you a unique perspective. You value knowledge and have a natural ability to see beyond surface appearances."
        },
        'Innocent': {
            male: "As a male Innocent, your optimism and trust are your defining traits. You see the good in others and maintain hope even in difficult situations.",
            female: "As a female Innocent, your pure spirit and hopeful outlook bring light to those around you. You value harmony and simplicity in your relationships."
        },
        'Creator': {
            male: "As a male Creator, you have a powerful imagination and drive to bring new ideas into reality. You see possibilities where others see limitations.",
            female: "As a female Creator, your artistic vision and innovative thinking set you apart. You excel at expressing complex emotions and ideas through your creative work."
        },
        'Rebel': {
            male: "As a male Rebel, you challenge outdated systems and seek authentic freedom. Your courage to stand against the crowd inspires transformation.",
            female: "As a female Rebel, you break conventions and forge new paths. Your independent spirit and willingness to challenge norms creates space for change."
        },
        'Caregiver': {
            male: "As a male Caregiver, you provide strength and support to those around you. Your protective nature and generosity make you a pillar in your community.",
            female: "As a female Caregiver, your nurturing nature and compassion create safe spaces for others. You intuitively understand emotional needs and respond with warmth."
        },
        'Explorer': {
            male: "As a male Explorer, you thrive on new experiences and adventures. Your independent spirit and adaptability allow you to navigate diverse situations with ease.",
            female: "As a female Explorer, you seek freedom and authentic experiences. Your curiosity and courage to venture into the unknown reveal new possibilities to others."
        },
        'Ruler': {
            male: "As a male Ruler, you naturally take charge and create order. Your leadership abilities and strategic thinking help you manage complex situations effectively.",
            female: "As a female Ruler, your executive skills and vision inspire others to follow your lead. You excel at organizing resources and people toward meaningful goals."
        },
        'Lover': {
            male: "As a male Lover, you value deep connections and emotional intimacy. Your appreciation for beauty and commitment to relationships enriches your life and others'.",
            female: "As a female Lover, your passion and emotional intelligence create powerful bonds. You understand the importance of connection and bring warmth to all your relationships."
        }
    };
    
    let improvementTips = {
        'Hero': {
            male: "Tip for male Heroes: Learn to acknowledge vulnerability as a strength rather than a weakness. Practice self-compassion alongside your drive for achievement.",
            female: "Tip for female Heroes: Remember that asking for help is not a sign of weakness. Build a support network that can sustain you through your heroic journeys."
        },
        'Sage': {
            male: "Tip for male Sages: Balance intellectual pursuits with practical application. Find ways to share your knowledge that connects with others emotionally.",
            female: "Tip for female Sages: Trust your intuition alongside your analytical mind. Your wisdom flourishes when you integrate both ways of knowing."
        },
        'Innocent': {
            male: "Tip for male Innocents: Develop discernment while maintaining your optimism. Learning to recognize potential dangers doesn't mean losing your hopeful outlook.",
            female: "Tip for female Innocents: Practice setting healthy boundaries while maintaining your open heart. Not everyone deserves your immediate trust."
        },
        'Creator': {
            male: "Tip for male Creators: Cultivate discipline alongside your inspiration. Establishing regular creative practices will help you bring more of your visions to life.",
            female: "Tip for female Creators: Challenge self-doubt by sharing your work more widely. Your creative voice deserves to be heard, even when it feels vulnerable."
        },
        'Rebel': {
            male: "Tip for male Rebels: Channel your revolutionary energy into constructive change. The most effective rebels know which systems to challenge and when to collaborate.",
            female: "Tip for female Rebels: Build alliances with like-minded individuals. Your rebellion gains power when it inspires others to join your cause."
        },
        'Caregiver': {
            male: "Tip for male Caregivers: Create balance between caring for others and self-care. Your strength to support others comes from maintaining your own well-being.",
            female: "Tip for female Caregivers: Set clear boundaries to prevent burnout. Remember that saying 'no' sometimes allows you to say 'yes' more fully when it matters most."
        },
        'Explorer': {
            male: "Tip for male Explorers: Develop the ability to find meaning in everyday experiences. Not every journey requires physical distance to be transformative.",
            female: "Tip for female Explorers: Create a home base that honors your need for freedom. Building some stability allows your explorations to be more intentional."
        },
        'Ruler': {
            male: "Tip for male Rulers: Cultivate empathy alongside authority. The most respected leaders understand the needs and perspectives of those they lead.",
            female: "Tip for female Rulers: Recognize that vulnerability can strengthen your leadership. Authentic connection with your team builds deeper loyalty than perfect control."
        },
        'Lover': {
            male: "Tip for male Lovers: Balance passionate devotion with healthy independence. The strongest relationships allow space for individual growth.",
            female: "Tip for female Lovers: Nurture self-love as the foundation for all other relationships. Your capacity to love others flows from how you treat yourself."
        }
    };
    
    let resultText = `Your dominant archetypes are <strong>${topArchetypes}</strong>.<br><br>`;
    
    sortedResults.slice(0, 2).forEach(entry => {
        let archetype = entry[0];
        resultText += `<strong>${archetype}:</strong> ${insights[archetype][gender]} <br><br> ${improvementTips[archetype][gender]} <br><br>`;
    });
    
    $('#result-text').html(resultText);
    $('#result-container').show();
    
    // Scroll to results
    $('html, body').animate({
        scrollTop: $("#result-container").offset().top
            }, 800);
        }
        
        $(document).ready(function() {
            // Hide results container initially
            $('#result-container').hide();
            
            // Submit button click handler
            $('#submit-quiz').click(function(e) {
                e.preventDefault();
                validateAndCalculate();
            });
            
            // Reset button click handler
            $('#reset-quiz').click(function() {
                $('#quiz-form')[0].reset();
                $('#result-container').hide();
            });
            
            // Add hover effects for quiz options
            $('.quiz-option').hover(
                function() {
                    $(this).addClass('option-hover');
                },
                function() {
                    $(this).removeClass('option-hover');
                }
            );
            
            // Add animation for selecting options
            $('.quiz-option input').change(function() {
                let name = $(this).attr('name');
                $('.quiz-option input[name="' + name + '"]').parents('.quiz-option').removeClass('selected');
                $(this).parents('.quiz-option').addClass('selected');
            });
            
            // Share results functionality
            $('#share-results').click(function() {
                let resultText = $('#result-text').text();
                let shareText = "I took the Personality Archetype Quiz and discovered that " + 
                                resultText.split('.')[0] + ". Take the quiz yourself!";
                
                // Create temporary input for copying text
                let tempInput = $('<input>');
                $('body').append(tempInput);
                tempInput.val(shareText).select();
                document.execCommand('copy');
                tempInput.remove();
                
                alert("Result copied to clipboard! You can now paste and share it.");
            });
            
            // Additional analytics tracking
            function trackQuizCompletion(archetypes) {
                // This function would integrate with your analytics platform
                console.log("Quiz completed. Dominant archetypes: " + archetypes);
                // Example: gtag('event', 'quiz_completion', {'archetypes': archetypes});
            }
            
            // Expand the quiz with additional functionality
            function showRelatedResources(archetypes) {
                let resourcesHTML = '<h3>Recommended Resources</h3><ul>';
                
                archetypes.forEach(archetype => {
                    switch(archetype) {
                        case 'Hero':
                            resourcesHTML += '<li><a href="#">The Hero\'s Journey: Personal Growth Guide</a></li>';
                            break;
                        case 'Sage':
                            resourcesHTML += '<li><a href="#">Wisdom Practices for the Modern Sage</a></li>';
                            break;
                        case 'Innocent':
                            resourcesHTML += '<li><a href="#">Maintaining Optimism in a Complex World</a></li>';
                            break;
                        case 'Creator':
                            resourcesHTML += '<li><a href="#">Unlocking Your Creative Potential</a></li>';
                            break;
                        case 'Rebel':
                            resourcesHTML += '<li><a href="#">Constructive Rebellion: Changing Systems from Within</a></li>';
                            break;
                        case 'Caregiver':
                            resourcesHTML += '<li><a href="#">Balanced Caregiving: Avoiding Burnout</a></li>';
                            break;
                        case 'Explorer':
                            resourcesHTML += '<li><a href="#">The Explorer\'s Mindset: Finding Adventure Everywhere</a></li>';
                            break;
                        case 'Ruler':
                            resourcesHTML += '<li><a href="#">Compassionate Leadership for Natural Rulers</a></li>';
                            break;
                        case 'Lover':
                            resourcesHTML += '<li><a href="#">Deepening Connections: A Guide for Lovers</a></li>';
                            break;
                    }
                });
                
                resourcesHTML += '</ul>';
                $('#resources-container').html(resourcesHTML).show();
            }
            
            // Modify calculateResult to include these new functions
            let originalCalculateResult = calculateResult;
            calculateResult = function() {
                originalCalculateResult();
                
                // Get top archetypes for additional functionality
                let answers = {};
                $("#quiz-form input[type='radio']:checked").each(function() {
                    let name = $(this).attr('name');
                    if (name !== 'gender') {
                        let value = $(this).val();
                        answers[value] = (answers[value] || 0) + 1;
                    }
                });
                
                let sortedResults = Object.entries(answers).sort((a, b) => b[1] - a[1]);
                let topArchetypes = sortedResults.slice(0, 2).map(entry => entry[0]);
                
                // Show related resources
                showRelatedResources(topArchetypes);
                
                // Track completion
                trackQuizCompletion(topArchetypes.join(' and '));
            }
        });