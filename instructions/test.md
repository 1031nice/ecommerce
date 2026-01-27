# Backend Testing Guidelines

이 문서는 프로젝트의 백엔드 단위 테스트 작성 가이드라인입니다. 모든 새로운 기능 및 리팩토링 시 이 가이드를 준수하여 테스트 코드를 작성해 주세요.

## 1. 기본 원칙
- **Framework**: JUnit 5 + Mockito + AssertJ
- **Scope**: Service 레이어의 비즈니스 로직 검증에 집중 (Repository나 Controller는 필요한 경우에만)
- **Isolation**: `@SpringBootTest`보다는 `@ExtendWith(MockitoExtension.class)`를 사용하여 가볍고 빠른 단위 테스트를 지향합니다.

## 2. Naming & Documentation
- **Class Name**: `TargetClass` + `Test` (e.g., `ProductServiceTest`)
- **Method Name**: 테스트 대상을 명확히 표현하는 영어 이름 (e.g., `getAllProducts_success`)
- **@DisplayName**: 테스트 내용을 **한글로 구체적으로** 서술합니다.
  ```java
  @Test
  @DisplayName("상품 목록 조회 시, 삭제된 상품은 제외하고 DTO로 변환되어 반환된다")
  void getAllProducts_success() { ... }
  ```

## 3. Structure (Given-When-Then)
BDD 스타일의 3단 구성을 주석으로 명시하여 가독성을 높입니다.

```java
@Test
@DisplayName("예시 테스트")
void exampleTest() {
    // Given: 테스트 준비 (Mock 설정, 데이터 생성)
    User user = User.builder().id(UUID.randomUUID()).name("tester").build();
    given(userRepository.findById(any())).willReturn(Optional.of(user));

    // When: 테스트 대상 실행
    UserDTO result = userService.getUser(user.getId());

    // Then: 결과 검증 (AssertJ 활용)
    assertThat(result.getName()).isEqualTo("tester");
    then(userRepository).should(times(1)).findById(any());
}
```

## 4. MapStruct & Mocking
Service 테스트 시 Mapper 역시 Mocking 대상입니다. 실제 Mapper 로직을 태우지 않고, Mapper가 반환할 기대값을 설정합니다.

```java
@Mock
private UserMapper userMapper;

// ...
given(userMapper.toDTO(any())).willReturn(expectedDto);
```

## 5. Assertion (AssertJ)
JUnit의 `assertEquals`보다 가독성이 좋은 AssertJ의 `assertThat`을 사용합니다.
- `assertThat(actual).isEqualTo(expected);`
- `assertThat(actual).isNotNull();`
- `assertThat(list).hasSize(3).contains(item);`
