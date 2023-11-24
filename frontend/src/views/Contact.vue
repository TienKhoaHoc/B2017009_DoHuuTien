<template>
<!-- breadcrumb-section -->
<div class="breadcrumb-section breadcrumb-bg">
    <div class="container">
        <div class="row">
            <div class="col-lg-8 offset-lg-2 text-center">
                <div class="breadcrumb-text">
                    <p>Hỗ trợ 24/7t</p>
                    <h1>Liên Hệ</h1>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- end breadcrumb section -->

<!-- contact form -->
<div class="contact-from-section mt-100 mb-150">
    <div class="container">
        <div class="row">
            <div class="col-lg-8 mb-5 mb-lg-0">
                <div class="form-title">
                    <h2>Bạn có câu hỏi nào không?</h2>
                    <p>Nếu bạn có bất kỳ câu hỏi hoặc chủ đề cụ thể nào bạn muốn thảo luận, vui lòng hỏi tôi.</p>
                </div>
                <div id="form_status"></div>
                <div class="contact-form">
                    <form type="POST" id="fruitkha-contact">
                        <p>
                            <input type="text" placeholder="Tên" name="name" id="name">
                            <input type="email" class="mx-1" placeholder="Email" name="email" id="email">
                        </p>
                        <p>
                            <input type="tel" placeholder="Số điện thoại" name="phone" id="phone">
                            <input type="text" class="mx-1" placeholder="Chủ đề" name="subject" id="subject">
                        </p>
                        <p><textarea name="message" id="message" cols="30" rows="10" placeholder="Nội dung"></textarea></p>
                        <input type="hidden" name="token" value="FsWga4&@f6aw" />
                        <p><input type="submit" value="Gửi"></p>
                    </form>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="contact-form-wrap">
                    <div class="contact-form-box">
                        <h4><i class="fas fa-map"></i> Địa chỉ</h4>
                        <p>NVC <br> Ninh Kiều, Cần Thơ<br></p>
                    </div>
                    <div class="contact-form-box">
                        <h4><i class="far fa-clock"></i>Giờ mở cửa</h4>
                        <p>Cả tuần, 8h - 22h </p>
                    </div>
                    <div class="contact-form-box">
                        <h4><i class="fas fa-address-book"></i>Liên hệ qua: </h4>
                        <p>Phone: 0123456789 <br> Email: dhtien2k2@gmail.com</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- end contact form -->    
</template>