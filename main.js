
$( document ).ready(function() {
    
    const members = [{firstName:'Jorge', lastName: 'Monroy', phone: 3184562156, email:'jorge.monoroy@hotmail.com'},
    {firstName:'Jorge Luis', lastName: 'Monroy', phone: 3254569855, email:'jorgeLuis.monoroy@hotmail.com'},
    {firstName:'Stephanie', lastName: 'Herrera', phone: 3106841233, email:'stephanieMHerera@hotmail.com'},
    {firstName:'Ana', lastName: 'Herrera', phone: 3504986524, email:'anaHerreraH@hotmail.com'},
    {firstName:'Rosa', lastName: 'Herrera', phone: 32014963652, email:'rosa152@hotmail.com'},
    {firstName:'Edilma', lastName: 'Herrera', phone: 3231588652, email:'edil@hotmail.com'},
    {firstName:'Angelica', lastName: 'Herrera', phone: 314562322, email:'angie15@hotmail.com'}];
    
    const $tbody = $('.js-tbody');
    var datesTable = function() {
        var tds;
        var row;
        members.forEach((member,index) => {
            row = "";
            tds = "";
            Object.keys(member).forEach((property) => {
                tds += `<td class='js-${property}'>`+ member[property] +'</td>';
            });
            tds += `<td class="tdButton"><button data-id="${index}" class="button js-btn-edit">Edit</button><img class="iconFavorites js-btn-star" src="./Img./star.png" data-id="${index}"></td>`;
            row += `<tr data-id="${index}" class="${index}">${tds}</tr>`;
            $tbody.append(row);
        });
    }
    datesTable();

    const $editModal = $('.js-modal-edit');
    const $closeModal = $('.js-btn-close-modal');
    const $saveBtn = $('.js-btn-save');
    const $firstNameInput = $('.js-edit-input-firstname');
    const $lastNameInput = $('.js-edit-input-lastname');
    const $phoneInput = $('.js-edit-input-phone');
    const $emailInput = $('.js-edit-input-email');

    function onClickEdit(){
        $editModal.toggle();
        var btnDataId = $(this).data('id');
        var firstName = $(this).parent().parent().find('.js-firstName').text();
        var lastName = $(this).parent().parent().find('.js-lastName').text();
        var phone = $(this).parent().parent().find('.js-phone').text();
        var email = $(this).parent().parent().find('.js-email').text();
        $firstNameInput.val(firstName);
        $lastNameInput.val(lastName);
        $phoneInput.val(phone);
        $emailInput.val(email);
        $saveBtn.data('id', btnDataId);
    }

    $tbody.on('click', '.js-btn-edit', onClickEdit);

    const $btnCreate = $('.js-btn-create');

    $btnCreate.click(function(){
        $firstNameInput.val("");
        $lastNameInput.val("");
        $phoneInput.val("");
        $emailInput.val("");
        $editModal.toggle();
        $saveBtn.data('create-user', true);
    });

    $saveBtn.click(function(){
        const  firstNameInputValue = $('.js-edit-input-firstname').val();
        const  lastNameInputValue = $('.js-edit-input-lastname').val();
        const  phoneInputValue = $('.js-edit-input-phone').val();
        const  emailInputValue = $('.js-edit-input-email').val();
        if($saveBtn.data("create-user") === true){
            
            var lastRowDataId = $tbody.find($("tr:last-child")).data('id');
            $tbody.append(`<tr data-id="${lastRowDataId +1}"><td class="js-firstName">${firstNameInputValue}</td><td class="js-lastName">${lastNameInputValue}</td><td class="js-phone">${phoneInputValue}</td><td class="js-email">${emailInputValue}</td><td class="tdButton"><button data-id="${lastRowDataId +1}" class="button js-btn-edit">Edit</button><img class="iconFavorites js-btn-star" src="./Img./star.png"></td></tr>`);
            $saveBtn.data('create-user', false);

        } else {
            var rowDataId = $(this).data('id');
            var $selectedRow = $("tbody").find(`tr[data-id='${rowDataId}']`);
            var $firstNameTd = $selectedRow.find('.js-firstName');
            var $lastNameTd = $selectedRow.find('.js-lastName');
            var $phoneTd = $selectedRow.find('.js-phone');
            var $emailTd = $selectedRow.find('.js-email');

            $firstNameTd.text(firstNameInputValue);
            $lastNameTd.text(lastNameInputValue);
            $phoneTd.text(phoneInputValue);
            $emailTd.text(emailInputValue);
        }
    });

    $closeModal.click(function(){
        $editModal.toggle();
    });

    $editModal.click(function(event){
        const classModalEdit = event.target.className;
        if(!classModalEdit.includes('js-edit-form') && 
        (!classModalEdit.includes('js-edit-text') && 
        (!classModalEdit.includes('js-edit-input') && 
        (!classModalEdit.includes('js-edit-btn'))))){
           $editModal.hide();
        }
    });

    const $bodyFavorites = $('.js-tbody-favorites');
    $btnStar = $('.js-btn-star');
    $btnStar.click(function(){
        
        const starDataId = $(this).data('id');
        const $ownRowStar = $('.js-tbody').find(`tr[data-id='${starDataId}']`);
        const firstNameRowStar = $ownRowStar.find('.js-firstName').text();
        const lastNameRowStar = $ownRowStar.find('.js-lastName').text();
        const phoneRowStar = $ownRowStar.find('.js-phone').text();
        const emailRowStar = $ownRowStar.find('.js-email').text();
        $bodyFavorites.append(`<tr data-favorites="${starDataId}"><td class="js-firstName">${firstNameRowStar}</td><td class="js-lastName">${lastNameRowStar}</td><td class="js-phone">${phoneRowStar}</td><td class="js-email">${emailRowStar}</td><td class="tdButton"><img class="iconFavorites iconFavorites--close js-btn-favorites-close" data-favorites="${starDataId}" src="./Img./close.png"></tr>`);
        $(this).css("filter", "grayscale(0%)");  

        $btnCloseFavorites = $('.js-btn-favorites-close');
        $btnCloseFavorites.click(function(){
            var closeDataId = $(this).data('favorites');
            var $selectedRowFavorites = $bodyFavorites.find(`tr[data-favorites='${closeDataId}']`);
            $selectedRowFavorites.hide();
            var $starChange = $('.js-tbody').find(`img[data-id='${closeDataId}']`);
            $starChange.css("filter", "grayscale(100%)");
        });
    });
    

});



