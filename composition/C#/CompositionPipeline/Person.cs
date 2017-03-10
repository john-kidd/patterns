namespace CompositionPipeline
{
	public class Person
	{
		public Person(string name = "", string emailAddress = "") {
			EmailAddress = emailAddress;
			Name = name;
		}

		public string Name { get; private set; }

		public string EmailAddress { get; private set; }
	}
}
