using Microsoft.Maui.Controls;
using System;
using System.Linq;

namespace JumpStart
{
    public partial class FilterPage : ContentPage
    {
        public FilterPage()
        {
            InitializeComponent();
        }

        private async void OnApplyFiltersClicked(object sender, EventArgs e)
        {
            string selectedExperience = null;
            string selectedSalaryRange = null;

            // Find selected experience
            foreach (var child in ExperienceGroup.Children)
            {
                if (child is RadioButton radioButton && radioButton.IsChecked)
                {
                    selectedExperience = radioButton.Value.ToString();
                    break;
                }
            }

            // Find selected salary range
            foreach (var child in SalaryGroup.Children)
            {
                if (child is RadioButton radioButton && radioButton.IsChecked)
                {
                    selectedSalaryRange = radioButton.Value.ToString();
                    break;
                }
            }

            var filters = new FilterOptions
            {
                Experience = selectedExperience,
                SalaryRange = selectedSalaryRange
            };

            MessagingCenter.Send(this, "ApplyFilters", filters);
            await Navigation.PopModalAsync();
        }
    }

    public class FilterOptions
    {
        public string Experience { get; set; }
        public string SalaryRange { get; set; }
    }
}
