namespace LoadData
{
    public class GraphQLInput
    {
        public static string LoginMutation()
        {
            string loginMutation = "mutation login($email: String!, $password: String!) {login(email: $email, password: $password)}";
            return loginMutation;
        }
    }
}