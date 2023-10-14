function kakaoShare() {
    Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: '십이간지로 알아보는 연애유형',
          description: '아메리카노, 빵, 케익',
          imageUrl:
            'https://mud-kage.kakao.com/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg',
          link: {
            mobileWebUrl: 'https://developers.kakao.com',
          },
        },
        buttons: [
          {
            title: '나도 테스트 하러가기',
            link: {
              mobileWebUrl: 'https://developers.kakao.com',
              webUrl: 'https://developers.kakao.com',
            },
          },
        ],
    });
}
