let currentMethod = '';
let selectedGiftType = '';

function selectLoginMethod(method) {
    currentMethod = method;
    
    const loginLabel = document.getElementById('loginLabel');
    switch(method) {
        case 'google':
            loginLabel.textContent = 'Email Google';
            document.getElementById('username').placeholder = 'example@gmail.com';
            break;
        case 'apple':
            loginLabel.textContent = 'Apple ID';
            document.getElementById('username').placeholder = 'example@icloud.com';
            break;
        case 'facebook':
            loginLabel.textContent = 'Email hoặc số điện thoại Facebook';
            document.getElementById('username').placeholder = 'Email hoặc số điện thoại';
            break;
        case 'email':
            loginLabel.textContent = 'Email';
            document.getElementById('username').placeholder = 'example@email.com';
            break;
    }
    
    nextStep(2);
}

function nextStep(step) {
    if (step === 2) {
        document.getElementById('step1').classList.add('hidden');
        document.getElementById('step2').classList.remove('hidden');
        updateStepDots(2);
    } else if (step === 3) {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        if (!username || !password) {
            alert('Vui lòng nhập đầy đủ thông tin đăng nhập!');
            return;
        }
        
        document.getElementById('step2').classList.add('hidden');
        document.getElementById('step3').classList.remove('hidden');
        updateStepDots(3);
    } else if (step === 4) {
        const fullname = document.getElementById('fullname').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        const ward = document.getElementById('ward').value;
        const district = document.getElementById('district').value;
        const city = document.getElementById('city').value;
        const zipcode = document.getElementById('zipcode').value;
        
        if (!fullname || !phone || !address || !ward || !district || !city || !zipcode) {
            alert('Vui lòng điền đầy đủ thông tin!');
            return;
        }
        
        document.getElementById('step3').classList.add('hidden');
        document.getElementById('step4').classList.remove('hidden');
        updateStepDots(4);
    }
}

function backToStep(step) {
    if (step === 1) {
        document.getElementById('step2').classList.add('hidden');
        document.getElementById('step1').classList.remove('hidden');
        updateStepDots(1);
    }
}

function updateStepDots(activeStep) {
    for (let i = 1; i <= 4; i++) {
        const dot = document.getElementById('dot' + i);
        if (i === activeStep) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    }
}

function selectGift(type) {
    selectedGiftType = type;
    
    // Remove selected class from all options
    document.querySelectorAll('.gift-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Add selected class to clicked option
    event.target.closest('.gift-option').classList.add('selected');
    
    // Show confirm button
    document.getElementById('confirmGiftBtn').classList.remove('hidden');
}

function processGift() {
    if (!selectedGiftType) {
        alert('Vui lòng chọn phần quà!');
        return;
    }
    
    if (selectedGiftType === 'money') {
        document.getElementById('step4').classList.add('hidden');
        document.getElementById('step5').classList.remove('hidden');
    } else {
        // Show processing then virus warning
        document.getElementById('step4').classList.add('hidden');
        document.getElementById('processing').classList.remove('hidden');
        
        setTimeout(() => {
            document.getElementById('warningModal').classList.remove('hidden');
        }, 2000);
    }
}

function processBankTransfer() {
    const bankName = document.getElementById('bankName').value;
    const bankAccount = document.getElementById('bankAccount').value;
    const accountName = document.getElementById('accountName').value;
    const bankBranch = document.getElementById('bankBranch').value;
    
    if (!bankName || !bankAccount || !accountName || !bankBranch) {
        alert('Vui lòng điền đầy đủ thông tin tài khoản!');
        return;
    }
    
    // Show processing
    document.getElementById('step5').classList.add('hidden');
    document.getElementById('processing').classList.remove('hidden');
    
    // Show virus warning after 2 seconds
    setTimeout(() => {
        document.getElementById('warningModal').classList.remove('hidden');
    }, 2000);
}

function closeModal() {
    document.getElementById('warningModal').classList.add('hidden');
    document.getElementById('processing').classList.add('hidden');
    
    // Reset to step 1
    document.getElementById('step1').classList.remove('hidden');
    document.getElementById('step2').classList.add('hidden');
    document.getElementById('step3').classList.add('hidden');
    document.getElementById('step4').classList.add('hidden');
    document.getElementById('step5').classList.add('hidden');
    updateStepDots(1);
    
    // Reset all forms
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('fullname').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('address').value = '';
    document.getElementById('ward').value = '';
    document.getElementById('district').value = '';
    document.getElementById('city').value = '';
    document.getElementById('zipcode').value = '';
    document.getElementById('bankName').value = '';
    document.getElementById('bankAccount').value = '';
    document.getElementById('accountName').value = '';
    document.getElementById('bankBranch').value = '';
    
    selectedGiftType = '';
    document.querySelectorAll('.gift-option').forEach(option => {
        option.classList.remove('selected');
    });
    document.getElementById('confirmGiftBtn').classList.add('hidden');
}