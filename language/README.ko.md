<div align="center">

<img src="../content/asset/favicon.svg" width="96" height="96" alt="픽셀 금색 고리">

# uoo

**Ultima Online Outlands용 Razor 스크립트**

사냥, 채집, 스킬 훈련, 집 정리. 반복 작업은 공용 블록으로, 선택의 근거는 문서로.

[![MIT](https://img.shields.io/badge/license-MIT-1111aa?style=flat-square)](../LICENSE)
![UO Outlands](https://img.shields.io/badge/UO-Outlands-8b1a1a?style=flat-square)
![Razor](https://img.shields.io/badge/Razor-Outlands%20fork-2b6cb0?style=flat-square)

[문서](https://nomeehej.github.io/uoo/) | [스크립트](../script/README.md) | [설정](config.ko.md) | [English](../README.md)

</div>

Ultima Online Outlands를 플레이하며 사용하는 스크립트, 클라이언트 프로필, 게임 기록을 모은 개인 저장소.
캐릭터 템플릿과 전투 보조부터 채집, 다음 출발 준비까지 반복 작업과 그 선택의 근거를 함께 보관.

## 일상 플레이를 위한 스크립트

필드와 집에서 캐릭터가 반복하는 작업을 중심으로 구성.

| 범위 | 담긴 것 |
| --- | --- |
| 전투 | 바딩, 아처리, 네크로, 펫을 사용하는 템플릿별 보조 루프와 공용 PvP 회복 |
| 채집 | 회복과 자원 처리를 포함한 벌목, 스키닝 루프 |
| 핫키와 준비 | 무기 교체, 장비 복구, 로드아웃, 보급 |
| 전리품과 정리 | 감정, 분해, 분류, 은행 보관, 벤더 재고 채우기 |
| 훈련 | 스킬 반복 연습용 스크립트 |

Outlands 클라이언트에 포함된 Razor와 그 확장 문법 사용.
개별 루프의 역할과 수동으로 남긴 동작은 [스크립트 목록](../script/README.md).

## 공용 모듈과 템플릿별 레시피

전투와 채집 루프는 회복, 포션, 버프, 바딩, 펫 관리, 장비 처리를 맡는 공용 블록으로 조립.
레시피는 캐릭터 템플릿에 맞는 블록, 순서, 설정을 선택.

공통 동작은 한 곳에 두고, 템플릿별 우선순위는 각 레시피에 보관.
공용 블록을 고친 뒤 다시 조립하면 해당 블록을 쓰는 루프에 함께 반영.
결과물은 Razor에서 실행하는 `.razor` 파일 하나.

블록과 레시피의 관계는 [모듈 설계](../content/public/scripting/modules.md).

## 스크립트와 함께 두는 클라이언트 프로필

Razor와 ClassicUO 프로필에는 핫키, 에이전트, 쿨다운 바, 캐릭터 화면 배치를 보관.
컨테이너 같은 개인 선택도 프로필 변수로 저장해 공용 스크립트에서 참조.

바인딩, 장비, 템플릿이 바뀔 때 스크립트와 프로필의 관계를 함께 확인할 수 있는 구성.
프로필 구조와 게임 연결은 [설정 안내](config.ko.md).

## 문서로 남기는 메커니즘과 판단

스킬 상호작용, 회복 우선순위, 대상 관리, 템플릿별 선택처럼 스크립트의 근거가 되는 게임 메커니즘과 설계를 기록.
출처 링크와 날짜가 있는 인게임 관찰로 확인된 동작과 추가 확인이 필요한 질문 구분.

문서는 세 묶음. 스킬 계열별 서버 규칙(바딩, 네크로, 매저리, 아처리, 전투), 캐릭터 빌드마다 템플릿 한 쪽, 조립한 루프마다 한 쪽.
Razor 고유의 함정과 미확인 항목도 코드 가까이에 보관해 이후 수정에서 이전 기록을 참고할 수 있는 구성.
주제별 정본은 [문서 목록](../content/public/working/workflow.md#00.A).
