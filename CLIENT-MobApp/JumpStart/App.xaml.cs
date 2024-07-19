namespace JumpStart
{
    public partial class App : Application
    {
        public App()
        {
            InitializeComponent();

            MainPage = new NavigationPage(new LoadingPage());

            // Simulate loading data or initialization
            Task.Run(async () =>
            {
                await LoadAppDataAsync();
                MainThread.BeginInvokeOnMainThread(() =>
                {
                    // Navigate to AppShell once loading is complete
                    MainPage = new AppShell();
                });
            });
        }

        private async Task LoadAppDataAsync()
        {
            // Simulate loading time
            await Task.Delay(3000); // Adjust delay as needed
        }
    }
}
