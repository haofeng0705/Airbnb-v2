module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "build",
        "ci",
        "perf",
        "feat",
        "fix",
        "refactor",
        "docs",
        "chore",
        "style",
        "revert",
        "test",
      ],
    ],
    "type-case": [0],
    "type-empty": [0],
    "scope-empty": [0],
    "scope-case": [0],
    "subject-full-stop": [0],
    "subject-case": [0, "never"],
    "header-max-length": [0, "always", 72],
  },
};
