import hasher from "../../../utils/hasher/BcryptjsHasher";

test("HashAsync_OnValidInput_ReturnsTransformedOutput", async () => {
  // Arrange
  const inputTest = "p@ssw0rd";

  // Act
  let response = await hasher.hashAsync(inputTest);

  const doOutputStringDiffersFromInput = response != inputTest;

  expect(doOutputStringDiffersFromInput).toBeTruthy();
});

test("HashAsync_OnNullInput_ThrowsError", async () => {
  // Arrange
  const inputTest = null;

  // Act
  let errorFunc = async () => await hasher.hashAsync(inputTest as any);

  // Assert
  await expect(errorFunc).rejects.toThrowError();
});
