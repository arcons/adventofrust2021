fn main() {
  // --snip--
  // let args: Vec<String> = env::args().collect();

  // let query = &args[1];
  // let filename = &args[2];

  // println!("Searching for {}", query);
  // println!("In file {}", filename);

  let contents = load_from_file("./day1input1.txt");
  // let part1Answer =  part1(contents);
  // println!("Part 1 {}", part1Answer);
  let part2Answer =  part2(contents);
  println!("Part 2 {}", part2Answer);
}

struct Command {
  direction: String
  number: i32
}

fn part1(input: Vec<Vec<str>>) -> i32 {
  return 1
}

fn part2(input: Vec<Vec<str>>) -> i32 {
  return 1
}

fn load_from_file(file_path: &str) -> Vec<Vec<str>> {
  let file = File::open(file_path).expect("file wasn't found.");
  let reader = BufReader::new(file);

  let lines: Vec<Vec<str>> = reader
      .lines()
      .map(|line| line.split_whitespace()>().collect())
      .collect();
  return lines;
}