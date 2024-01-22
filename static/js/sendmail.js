//  قسمت نظرات فرم


document.querySelectorAll("#contact-form").forEach((elm) => {
    elm.addEventListener('submit', (e) => {
        e.preventDefault()
        let $this = $(e.currentTarget);
        let name = e.currentTarget.querySelector('#contact-name').value;
        let email = e.currentTarget.querySelector('#contact-email').value;
        let description = e.currentTarget.querySelector('#contact-message').value;
        let isValidEmail = true;
        if (name.trim() === "") {
            e.currentTarget.querySelector("#error-message-name").innerHTML = " لطفا نام را وارد کنيد";
            e.currentTarget.querySelector("#contact-name").style.borderColor = 'red';
            return;
        }
        if (description.trim() === "") {
            e.currentTarget.querySelector("#error-message-description").innerHTML = " لطفا توضيحات را وارد کنيد";
            e.currentTarget.querySelector("#contact-message").style.borderColor = 'red';
            return;
        }
        if (email.trim() === "") {
            e.currentTarget.querySelector("#error-message-email").innerHTML = " لطفا ايميل را وارد کنيد";
            e.currentTarget.querySelector("#contact-email").style.borderColor = 'red';
            isValidEmail = false;
        } else {
            var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            if (!emailPattern.test(email)) {
                e.currentTarget.querySelector("#error-message-email").innerHTML = "ايميل وارد شده معتبر نيست مانند نمونه پر كنيد amir@gmail.com";
                e.currentTarget.querySelector("#contact-email").style.borderColor = 'red';
                isValidEmail = false;
            } else {
                e.currentTarget.querySelector("#error-message-email").innerHTML = "";
                e.currentTarget.querySelector("#contact-email").style.borderColor = '';
            }
        }
        if (!isValidEmail) {
            return;
        }
        var formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('description', description);
        formData.append('csrfmiddlewaretoken', e.currentTarget.querySelector("input[name=csrfmiddlewaretoken]").value);
        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: formData,
            contentType: false,
            processData: false,
            success: function (data) {
                e.target.reset();
                // پاک کردن ارورها
                document.getElementById("error-message-name").innerHTML = "";
                document.getElementById("error-message-description").innerHTML = "";
                document.getElementById("error-message-email").innerHTML = "";

                document.getElementById("success-message").innerText = "پیام شما با موفقیت ارسال شد! نظر شما پس از تایید مدیر در زیر همین پست نمایش داده خواهد شد.";
                document.getElementById("success-message").style.display = "block";

                setTimeout(function () {
                    document.getElementById("success-message").style.display = "none";
                }, 7000);
            },
            error: function () {
                document.getElementById("error-message").innerText = "متاسفانه مشکلی در ارسال پیام به وجود آمد. لطفاً دوباره امتحان نمایید!";
                document.getElementById("error-message").style.display = "block";
            }
        });

    })
})


//  قسمت نظرات فرم

document.querySelectorAll('.ajax-comment-form').forEach((elm) => {
    elm.addEventListener('submit', (e) => {
        e.preventDefault()
        let $this = $(e.currentTarget);
        let name = e.currentTarget.querySelector('#name2').value;
        let email = e.currentTarget.querySelector('#email2').value;
        let description = e.currentTarget.querySelector('#description2').value;
        let parent_id = e.currentTarget.querySelector('#parent2').value;
        let isValidEmail = true;
        if (name.trim() === '' || email.trim() === '' || description.trim() === '') {
            e.currentTarget.querySelector("#error-message1").innerHTML = "لطفاً تمامي فيلدهاي فرم را پر کنيد";
            e.currentTarget.querySelector("#error-message1").style.display = 'block';
            return;
        }
        if (email.trim() === "") {
            e.currentTarget.querySelector("#error-message1").innerHTML = "ايميل را وارد کنيد";
            e.currentTarget.querySelector("#email2").style.borderColor = 'red';
            isValidEmail = false;
        } else {
            var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            if (!emailPattern.test(email)) {
                e.currentTarget.querySelector("#error-message1").innerHTML = "ايميل وارد شده معتبر نيست";
                e.currentTarget.querySelector("#email2").style.borderColor = 'red';
                isValidEmail = false;
            } else {
                e.currentTarget.querySelector("#error-message1").innerHTML = "";
                e.currentTarget.querySelector("#email2").style.borderColor = '';
            }
        }
        if (!isValidEmail) {
            return;
        }
        var formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('description', description);
        formData.append('parent_id', parent_id);
        formData.append('csrfmiddlewaretoken', e.currentTarget.querySelector("input[name=csrfmiddlewaretoken]").value);
        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: formData,
            contentType: false,
            processData: false,
            success: function (data) {
                $this.find("#error-message1").hide();
                $this.find("#form-messages-" + parent_id).text("پيام شما با موفقيت ارسال شد!").css("color", "green");
                $this.find("#form-messages-" + parent_id).show();
                var replyList = $("#comment-form-" + parent_id).parents(".custom-border").find(".replies-list");
                if (replyList.length > 0) {
                    replyList.append('<li><div class="comment-info"><h3>' + name + ' گفته: </h3><span>همين حالا</span><p>' + description + '</p></div></li>');
                }
                $("#comment-form-" + parent_id)[0].reset();
                setTimeout(function () {
                    $this.find("#form-messages-" + parent_id).hide();
                }, 7000);
            },
            error: function (xhr, textStatus, errorThrown) {
                $this.find("#form-messages-" + parent_id).text("متاسفانه مشکلي در ارسال پيام به وجود آمد. لطفاً دوباره امتحان نماييد!");
                $this.find("#form-messages-" + parent_id).show();
            }
        });
    })
})


