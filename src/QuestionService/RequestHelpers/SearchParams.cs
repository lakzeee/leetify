namespace QuestionService.RequestHelpers;

public class SearchParams
{
    /// <summary>
    /// Page number for pagination.
    /// </summary>
    public int PageNumber { get; set; } = 1;

    /// <summary>
    /// Page size for pagination.
    /// </summary>
    public int PageSize { get; set; } = 5;

    /// <summary>
    /// Field for order the results by. Value can be CreatedAt, UpdatedAt
    /// </summary>
    public string OrderBy { get; set; }

    /// <summary>
    /// Gets or sets the filter criteria for searching questions.
    /// </summary>
    public string FilterBy { get; set; }

    /// <summary>
    /// Sort order for the results (e.g., asc or desc).
    /// </summary>
    public string SortOrder { get; set; } = "asc";

    /// <summary>
    /// Difficulty level for filtering questions. Multiply level separated by ","
    /// </summary>
    public string Difficulty { get; set; }
}