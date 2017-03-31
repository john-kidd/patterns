namespace FundService
{
	public class Fund
	{
		public int Id { get; }
		public string FundName { get; }
		public string FundType { get; }

		public Fund(int id, string fundName, string fundType) {
			FundType = fundType;
			FundName = fundName;
			Id = id;
		}
	}
}
