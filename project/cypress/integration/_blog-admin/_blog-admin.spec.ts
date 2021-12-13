/// <reference types="cypress" />

describe("_blog-amdin page 테스트", () => {
  it("login", () => {
    const socialLoginOptions = {
      username: Cypress.env("googleUser"),
      password: Cypress.env("googlePassword"),
      loginUrl: `${Cypress.env("siteName")}/api/auth/signin`,
      headless: true,
      logs: false,
      isPopup: true,
      cookieDelay: 500,
      loginSelector: ".provider:last-child form .button",
      postLoginSelector: "header nav a[href='/']",
    };

    return cy
      .task("GoogleSocialLogin", socialLoginOptions)
      .then(({ cookies }) => {
        cy.clearCookies();
        const cookie = cookies
          .filter((cookie) => cookie.name === Cypress.env("cookieName"))
          .pop();
        if (cookie) {
          cy.setCookie(cookie.name, cookie.value, {
            domain: cookie.domain,
            expiry: cookie.expires,
            httpOnly: cookie.httpOnly,
            path: cookie.path,
            secure: cookie.secure,
          });

          Cypress.Cookies.defaults({
            preserve: Cypress.env("cookieName"),
          });
        }
      });
  });
  it("menu navigation test", () => {
    cy.visit("/_blog-admin");
    cy.findByText("글").click();
    cy.findByText("블로그에 글을 발행하거나 관리합니다.").should("exist");

    cy.findByText("통계").click();
    cy.findByText(
      "statistics 컴포넌트, grid를 활용하여 통계적인 자료를 보여줄 수 있을까?"
    ).should("exist");

    cy.findByText("블로그로 이동").click();
    cy.location().should((loc) => {
      expect(loc.href).to.eq("http://localhost:3000/");
    });

    cy.get(".social-icon a").click();
    cy.location().should((loc) => {
      expect(loc.href).to.eq("https://github.com/kmin-283");
    });
  });

  it("post create test", () => {
    cy.visit("/_blog-admin");
    cy.findByText("글").click();
    cy.findByText("게시글 작성").click();
    cy.location().should((loc) => {
      expect(loc.href).to.eq("http://localhost:3000/_blog-admin/write");
    });

    cy.findByPlaceholderText("제목을 입력하세요").type("cypress 테스트 포스트");
    cy.get("main section:nth-child(2) h1").should(
      "have.text",
      "cypress 테스트 포스트"
    );

    cy.findByPlaceholderText("태그를 입력하세요").type("cypress{enter}", {
      force: true,
    });

    cy.findByPlaceholderText("태그를 입력하세요").type("자동화 테스트{enter}", {
      force: true,
    });

    cy.findByPlaceholderText("이번 포스트의 핵심 문장을 입력하세요").type(
      "cypress를 활용한 자동화 테스트로 작성된 포스트입니다....!"
    );

    cy.get("main section:nth-child(2) strong").should(
      "have.text",
      "cypress를 활용한 자동화 테스트로 작성된 포스트입니다....!"
    );

    cy.findByPlaceholderText("본문을 작성하세요...").type(
      "본문의 작성에는 몇가지 작업이 필요합니다." +
        "\n\n" +
        "## 첫 번째 헤딩입니다." +
        "\n\n" +
        "첫 번째 헤딩의 내용이구요" +
        "\n\n" +
        '![존재하지 않는 이미지입니다](/not-exist-image.webp "존재하지 않아요")' +
        "\n\n" +
        "### 두 번째 헤딩입니다." +
        "\n\n" +
        "그 내용이구요" +
        "\n\n" +
        "#### 세 번째 헤딩입니다." +
        "\n\n" +
        "그 내용 3번쨉니다" +
        "\n\n" +
        "#### 3-2 헤딩이겠네요" +
        "\n\n" +
        "3-2 헤딩의 본문입니다" +
        "\n" +
        '![두 번째 존재하지 않는 이미지요!](/not-exist-image2.webp "역시나 없어요")' +
        "\n\n" +
        "## 두 번째 새로운 헤딩입니다!" +
        "\n\n" +
        "여기서 부턴 새로운 섹션이죠"
    );

    cy.get("main section:nth-child(2) main")
      .find("h2")
      .eq(0)
      .should("have.text", "첫 번째 헤딩입니다.");
    cy.get("main section:nth-child(2) main")
      .find("h3")
      .eq(0)
      .should("have.text", "두 번째 헤딩입니다.");
    cy.get("main section:nth-child(2) main")
      .find("h4")
      .eq(0)
      .should("have.text", "세 번째 헤딩입니다.");
    cy.get("main section:nth-child(2) main")
      .find("h4")
      .eq(1)
      .should("have.text", "3-2 헤딩이겠네요");
    cy.get("main section:nth-child(2) main")
      .find("h2")
      .eq(1)
      .should("have.text", "두 번째 새로운 헤딩입니다!");

    cy.get("main section:nth-child(2) main").find("img").eq(0).should("exist");
    cy.get("main section:nth-child(2) main").find("img").eq(1).should("exist");

    cy.findByText("출간").click();
    cy.location().should((loc) => {
      expect(loc.href).to.eq("http://localhost:3000/_blog-admin");
    });
  });

  it("post edit test", () => {
    cy.findByText("글").click();
    cy.findByText("cypress 테스트 포스트")
      .parents("li")
      .find("div")
      .last()
      .click();
    cy.findByText("수정하기").click();
    cy.get("main > section:first-child > input").eq(0).type("-수정");
    cy.findByText("수정").click();

    cy.findByText("글").click();
    cy.findByText("cypress 테스트 포스트-수정").should("exist");
  });

  it("post delete test", () => {
    cy.visit("/_blog-admin");
    cy.findByText("글").click();

    cy.findByText("cypress 테스트 포스트-수정")
      .parents("li")
      .find("div")
      .last()
      .click();
    cy.findByText("삭제하기").click();
  });
});
