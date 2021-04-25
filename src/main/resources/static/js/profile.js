/**
  1. 프로파일 페이지
  (1) 구독하기, 구독취소
  (2) 구독자 정보 모달 보기
  (3) 구독자 정보 모달에서 구독하기, 구독취소
 */



// 구독자 정보  모달 보기
function subscribeInfoModalOpen() {
	$(".modal-subscribe").css("display", "flex");

	let userId = $("#userId").val();

	$.ajax({
		url: `/user/${userId}/subscribe`,
	})
		.done((res) => {
			$("#subscribeModalList").empty();

			res.data.forEach((u) => {
				let item = getSubscribeModalItem(u);
				$("#subscribeModalList").append(item);
			});
		})
		.fail((error) => {
			console.log("오류 : " + error.text);
		});

}

// 구독자 정보 모달에서 아이템 생성
function getSubscribeModalItem(u) {
	let item = `<div class="subscribe__item" id="subscribeModalItem-${u.userId}">`;
	item += `<div class="subscribe__img">`;
	item += `<img src="/upload/${u.profileImageUrl}" alt=""  onerror="this.src='/images/person.jpeg'"/>`;
	item += `</div>`;
	item += `<div class="subscribe__text">`;
	item += `<h2>${u.username}</h2>`;
	item += `</div>`;
	item += `<div class="subscribe__btn">`;
	if (!u.equalState) {
		if (u.subscribeState) {
			item += `<button class="cta blue" onclick="toggleSubscribeModal(${u.userId}, this)">구독취소</button>`;
		} else {
			item += `<button class="cta" onclick="toggleSubscribeModal(${u.userId}, this)">구독하기</button>`;
		}
	}
	item += `</div>`;
	item += `</div>`;

	return item;
}

// 구독자 정보 모달에서 구독하기, 구독 취소하기
function toggleSubscribeModal(userId, obj) {

	if ($(obj).text() === "구독취소") {
		$.ajax({
			type: "DELETE",
			url: "/subscribe/" + userId,
			dataType: "json",
		}).done((res) => {
			$(obj).text("구독하기");
			$(obj).toggleClass("blue");
		});
	} else {
		$.ajax({
			type: "POST",
			url: "/subscribe/" + userId,
			dataType: "json",
		}).done((res) => {
			$(obj).text("구독취소");
			$(obj).toggleClass("blue");
		});
	}
}

// 구독자 정보 프로파일 메인화면에서 구독하기, 구독취소
function toggleSubscribe(userId, obj) {

	if ($(obj).text() === "구독취소") {
		$.ajax({
			type: "DELETE",
			url: "/subscribe/" + userId,
			dataType: "json",
		}).done((res) => {
			$(obj).text("구독하기");
			$(obj).toggleClass("blue");
		});
	} else {
		$.ajax({
			type: "POST",
			url: "/subscribe/" + userId,
			dataType: "json",
		}).done((res) => {
			$(obj).text("구독취소");
			$(obj).toggleClass("blue");
		});
	}
}

// 프로파일 사진 변경 (완)
function profileImageUpload() {
	$("#userProfileImageInput").click();

	$("#userProfileImageInput").on("change", (e) => {
		let f = e.target.files[0];

		if (!f.type.match("image.*")) {
			alert("이미지를 등록해야 합니다.");
			return;
		}

		// 사진 전송 성공시 이미지 변경
		let reader = new FileReader();
		reader.onload = (e) => {
			$("#userProfileImage").attr("src", e.target.result);
		}
		reader.readAsDataURL(f); // 이 코드 실행시 reader.onload 실행됨.
	});
}


// 사용자 정보 메뉴 보기
function popup(obj) {
	$(obj).css("display", "flex");
}

// 사용자 정보 메뉴 닫기
function closePopup(obj) {
	$(obj).css("display", "none");
}


// 모달 제어!!
function modalInfo() {
	$(".modal-info").css("display", "none");
}

function modalImage() {
	$(".modal-image").css("display", "none");
}

function modalClose() {
	$(".modal-subscribe").css("display", "none");
	location.reload();
}


